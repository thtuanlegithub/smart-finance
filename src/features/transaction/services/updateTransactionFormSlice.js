import { createSlice } from "@reduxjs/toolkit";
import formatTime from "../../../utils/formatTime";
import { formatDate } from "../../../utils/formatDate";
import { getCurrentUser } from "../../authentication";
import { FirebaseNodes } from "../../../data/firebaseConstant";
import { FirestoreSingleton } from "../../../patterns";
const firestoreInstance = FirestoreSingleton.getInstance().getFirestore();
const userCollection = firestoreInstance.collection(FirebaseNodes.USERS);

const deleteTransaction = async (transaction) => {
    const transactionDate = transaction.created_at;
    const trans_id = transaction.trans_id;
    
    const [month, day, year] = transactionDate.replace(',', '').split(' ');
    const userId = getCurrentUser().uid;
    const dayDocRef = userCollection.doc(userId).collection(FirebaseNodes.TRANSACTION).doc(year).collection(month).doc(day);

    let dayDoc = await dayDocRef.get();
    if (!dayDoc.exists) {
        throw new Error('Transaction does not exist');
    }

    const transactions = dayDoc.data().transactions || [];
    const existingTransactionIndex = transactions.findIndex(t => t.trans_id === trans_id);
    if (existingTransactionIndex === -1) {
        throw new Error('Transaction does not exist');
    }

    // Remove the transaction from the array
    const updatedTransactions = transactions.filter(t => t.trans_id !== trans_id);

    await dayDocRef.update({ transactions: updatedTransactions });
}

const initialState = {
    trans_id: '',
    type: 'expense',
    amount: 0,
    note: '',
    category_id: '',
    created_at: '',
    wallet: '',
    displayModal: null,
    reminderTime: formatTime(new Date()),
    reminderDate: formatDate(new Date()),
    hasReminder: false,
    people: [],
    reference: null,
    hasTax: false,
    insurance: 0,
    dependents: 0,
};


const updateTransactionFormSlice = createSlice({
    name: 'updateTransactionForm',
    initialState,
    reducers: {
        setUpdateTransactionId: (state, action) => {
            state.trans_id = action.payload;
        },
        setUpdateTransactionAmount: (state, action) => {
            state.amount = action.payload;
        },
        setUpdateTransactionNote: (state, action) => {
            state.note = action.payload;
        },
        setUpdateTransactionDate: (state, action) => {
            state.created_at = action.payload;
        },
        setUpdateTransactionWallet: (state, action) => {
            state.wallet = action.payload;
        },
        setUpdateTransactionPeople: (state, action) => {
            state.people = action.payload;
        },
        setUpdateTransactionCategory: (state, action) => {
            state.category_id = action.payload;
        },
        setUpdateTransactionType: (state, action) => {
            state.type = action.payload;
        },
        setUpdateTransactionReference: (state, action) => {
            state.reference = action.payload;
        },
        setUpdateTransactionReminderTime: (state, action) => {
            state.reminderTime = action.payload;
        },
        setUpdateTransactionReminderDate: (state, action) => {
            state.reminderDate = action.payload;
        },
        setUpdateTransactionHasReminder: (state, action) => {
            state.hasReminder = action.payload;
        },
        setUpdateTransactionHasTax: (state, action) => {
            state.hasTax = action.payload;
        },
        setUpdateTransactionInsurance: (state, action) => {
            state.insurance = action.payload;
        },
        setUpdateTransactionDependents: (state, action) => {
            state.dependents = action.payload;
        },
        clearUpdateInput: (state) => {
            Object.assign(state, initialState);
        },
        setDisplayUpdateTransactionModal: (state, action) => {
            state.displayModal = action.payload;
        }
    }
})


export const {
    setUpdateTransactionId,
    setUpdateTransactionAmount,
    setUpdateTransactionNote,
    setUpdateTransactionDate,
    setUpdateTransactionWallet,
    setUpdateTransactionPeople,
    setUpdateTransactionCategory,
    setUpdateTransactionType,
    setUpdateTransactionReference,
    setUpdateTransactionReminderTime,
    setUpdateTransactionReminderDate,
    setUpdateTransactionHasReminder,
    setUpdateTransactionHasTax,
    setUpdateTransactionInsurance,
    setUpdateTransactionDependents,
    clearUpdateInput,
    setDisplayUpdateTransactionModal,
} = updateTransactionFormSlice.actions;

export {
    deleteTransaction,
}

export default updateTransactionFormSlice.reducer;