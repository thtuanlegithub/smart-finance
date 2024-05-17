import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "../../authentication";
import { FirestoreSingleton } from "../../../patterns"
import { FirebaseNodes } from "../../../data/firebaseConstant";
import { parse, format, startOfWeek, endOfWeek } from "date-fns";

const firestoreInstance = FirestoreSingleton.getInstance().getFirestore();
const userCollection = firestoreInstance.collection(FirebaseNodes.USERS);
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getAllTransactions = async (walletId) => {
    try {
        const uid = getCurrentUser().uid;
        const userRef = userCollection.doc(uid);
        const transRef = userRef.collection(FirebaseNodes.TRANSACTION);

        const userDoc = await userRef.get();
        const userData = userDoc.data();
        const years = userData.years || [];

        let transactions = [];

        for (let year of years) {
            const yearRef = transRef.doc(year);
            const yearSnapshot = await yearRef.get();
            const yearData = yearSnapshot.data();
            const months = yearData.months || [];
            for (let month of months) {
                const monthRef = yearRef.collection(month);
                const transactionSnapshot = await monthRef.get();
                transactionSnapshot.forEach((doc) => {
                    const transactionData = doc.data();
                    const transactionsArray = transactionData.transactions || [];
                    transactionsArray.forEach((transactionData) => {
                        if (transactionData.wallet_id === walletId) {
                            transactions.push(transactionData);
                        }
                    });
                });
            }
        }
        return transactions;
    } catch (error) {
        console.error("Error fetching transactions:", error);
    }
};

const getAllTransactionsInMonth = async (walletId) => {
    try {
        const uid = getCurrentUser().uid;
        const userRef = userCollection.doc(uid);
        const transRef = userRef.collection(FirebaseNodes.TRANSACTION);

        // Check if the user has any transactions
        const transSnapshot = await transRef.get();
        if (transSnapshot.empty) {
            return [];
        }

        let transactions = [];
        const currentDate = new Date();
        const year = currentDate.getFullYear().toString();
        const month = months[currentDate.getMonth()];
        const yearRef = transRef.doc(year);
        const monthRef = yearRef.collection(month);
        const transactionSnapshot = await monthRef.get();
        transactionSnapshot.forEach((doc) => {
            const transactionData = doc.data();
            const transactionsArray = transactionData.transactions || [];
            transactionsArray.forEach((transactionData) => {
                if (transactionData.wallet_id === walletId) {
                    transactions.push(transactionData);
                }
            });
        });
        transactions = transactions.filter(transaction => transaction.type === 'expense');
        return transactions;
    } catch (error) {
        console.error("Error fetching month transactions:", error);
    }
}

const getAllTransactionsInWeek = async (walletId) => {
    try {
        const date = new Date();
        const { start, end } = getWeekRange(date);
        let transactions = await getTransactionsByRange(walletId, start, end);
        return transactions.filter(transaction => transaction.type === 'expense');
    } catch (error) {
        console.error("Error fetching week transactions:", error);
    }
}

function getWeekRange(date) {
    const firstDayOfWeek = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    const lastDayOfWeek = firstDayOfWeek + 6;

    const firstDay = new Date(date.setDate(firstDayOfWeek));
    firstDay.setHours(0, 0, 0, 0);

    const lastDay = new Date(date.setDate(lastDayOfWeek));
    lastDay.setHours(23, 59, 59, 999);

    return { start: firstDay, end: lastDay };
}

const getTransactionsByRange = async (walletId, start, end) => {
    try {
        const uid = getCurrentUser().uid;
        const userRef = userCollection.doc(uid);
        const transRef = userRef.collection(FirebaseNodes.TRANSACTION);

        // Check if the user has any transactions
        const transSnapshot = await transRef.get();
        if (transSnapshot.empty) {
            return [];
        }
        const startYear = start.getFullYear();
        const endYear = end.getFullYear();
        const startMonth = start.getMonth();
        const endMonth = end.getMonth();
        let transactions = [];

        for (let year = startYear; year <= endYear; year++) {
            const yearRef = transRef.doc(String(year));
            const startMonthIndex = year === startYear ? startMonth : 0;
            const endMonthIndex = year === endYear ? endMonth : 11;

            for (let monthIndex = startMonthIndex; monthIndex <= endMonthIndex; monthIndex++) {
                const monthRef = yearRef.collection(months[monthIndex]);
                const startDay = year === startYear && monthIndex === startMonthIndex ? start.getDate() : 1;
                const endDay = year === endYear && monthIndex === endMonthIndex ? end.getDate() : 31;

                for (let day = startDay; day <= endDay; day++) {
                    const dayRef = monthRef.doc(String(day));
                    const dayTransactionsSnapshot = await dayRef.get();

                    if (dayTransactionsSnapshot.exists) {
                        const dayTransactions = dayTransactionsSnapshot.data().transactions || [];
                        dayTransactions.forEach((transactionData) => {
                            if (transactionData.wallet_id === walletId) {
                                transactions.push(transactionData);
                            }
                        });
                    }
                }
            }
        }

        return transactions;
    } catch (error) {
        console.error("Error fetching by range transactions:", error);
    }
};

const getTop3Expense = (transactions) => {
    if (!Array.isArray(transactions)) {
        return [];
    }

    // Group transactions by category_id
    const groups = transactions.reduce((acc, transaction) => {
        if (!acc[transaction.category_id]) {
            acc[transaction.category_id] = [];
        }
        acc[transaction.category_id].push(transaction);
        return acc;
    }, {});

    // Calculate total amount for each group
    const groupTotals = Object.entries(groups).map(([category_id, transactions]) => {
        const amount = transactions.reduce((total, transaction) => total + transaction.amount, 0);
        return { category_id, amount, transactions };
    });

    // Sort groups by total amount and take top 3
    const top3Groups = groupTotals.sort((a, b) => b.amount - a.amount).slice(0, 3);

    // Calculate percentage for each group
    const totalExpense = top3Groups.reduce((total, group) => total + group.amount, 0);
    top3Groups.forEach(group => {
        group.percentage = Math.round((group.amount / totalExpense) * 100);
    });

    return top3Groups;
};

const getTotalExpense = (transactions) => {
    if (!Array.isArray(transactions)) {
        return 0;
    }
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
}

const groupTransactionsByWeek = (transactions) => {
    const grouped = {};

    transactions.forEach((transaction) => {
        const date = parse(transaction.created_at, 'MMMM d, yyyy', new Date());
        const start = startOfWeek(date);
        const end = endOfWeek(date);
        const week = format(start, 'd/M/yyyy') + ' - ' + format(end, 'd/M/yyyy');

        if (!grouped[week]) {
            grouped[week] = [];
        }
        grouped[week].push(transaction);
    });
    return grouped;
};

const groupTransactionsByMonth = (transactions) => {
    const grouped = {};

    transactions.forEach((transaction) => {
        const date = parse(transaction.created_at, 'MMMM d, yyyy', new Date());
        const month = format(date, 'MM/yyyy');

        if (!grouped[month]) {
            grouped[month] = [];
        }
        grouped[month].push(transaction);
    });
    return grouped;
};

const groupTransactionsByYear = (transactions) => {
    const grouped = {};

    transactions.forEach((transaction) => {
        const date = parse(transaction.created_at, 'MMMM d, yyyy', new Date());
        const year = format(date, 'yyyy');

        if (!grouped[year]) {
            grouped[year] = [];
        }
        grouped[year].push(transaction);
    });
    return grouped;
};

const initialState = {
    transactionTypeFilter: null,
    transactionTimeRange: null,
    transactionTimeRangeStart: null,
    transactionTimeRangeEnd: null,
    currentWallet: {
        amount: null,
        name: null,
    },
    currentTransactionCRUDAction: 'create',
};
const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        setTransactionTypeFilter: (state, action) => {
            state.transactionTypeFilter = action.payload;
        },
        setTransactionTimeRange: (state, action) => {
            state.transactionTimeRange = action.payload;
        },
        setTransactionTimeRangeStart: (state, action) => {
            state.transactionTimeRangeStart = action.payload;
        },
        setTransactionTimeRangeEnd: (state, action) => {
            state.transactionTimeRangeEnd = action.payload;
        },
        setCurrentWallet: (state, action) => {
            state.currentWallet = action.payload;
        },
        setCurrentTransactionCRUDAction: (state, action) => {
            state.currentTransactionCRUDAction = action.payload;
        },
        clearTransactionTimeRange(state) {
            state.transactionTimeRange = null;
            state.transactionTimeRangeStart = null;
            state.transactionTimeRangeEnd = null;
        },
    }
})

export const {
    setCurrentWallet,
    setTransactionTypeFilter,
    setTransactionTimeRange,
    setTransactionTimeRangeStart,
    setTransactionTimeRangeEnd,
    setCurrentTransactionCRUDAction,
    clearTransactionTimeRange
} = transactionSlice.actions;

export {
    getAllTransactions,
    getAllTransactionsInMonth,
    getAllTransactionsInWeek,
    getTop3Expense,
    getTotalExpense,
    groupTransactionsByWeek,
    groupTransactionsByMonth,
    groupTransactionsByYear,
    getTransactionsByRange,
}

export default transactionSlice.reducer;