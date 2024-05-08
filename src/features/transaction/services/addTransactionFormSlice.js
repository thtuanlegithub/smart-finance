import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionFields, FirebaseNodes } from "../../../data/firebaseConstant";
import { FirestoreSingleton } from "../../../patterns";
import formatTime from "../../../utils/formatTime";
import { formatDate } from "../../../utils/formatDate";
import { getCurrentUser } from "../../authentication";
import { firebase } from "@react-native-firebase/firestore";
const firestoreInstance = FirestoreSingleton.getInstance().getFirestore();
const userCollection = firestoreInstance.collection(FirebaseNodes.USERS);

// Firebase services
async function updateTransaction(trans_id, newTransaction) {
    const [month, day, year] = newTransaction.created_at.split(' ');
    const userId = getCurrentUser().uid;
    const dayDocRef = userCollection.doc(userId).collection(FirebaseNodes.TRANSACTION).doc(year).collection(month).doc(`Day ${day}`);

    let dayDoc = await dayDocRef.get();
    if (!dayDoc.exists) {
        await dayDocRef.set({ transactions: [] });
        dayDoc = await dayDocRef.get();
    }

    const transactions = dayDoc.data().transactions || [];
    let updatedTransactions;

    if (trans_id) {
        const existingTransactionIndex = transactions.findIndex(t => t.trans_id === trans_id);
        if (existingTransactionIndex !== -1) {
            updatedTransactions = [...transactions];
            updatedTransactions[existingTransactionIndex] = newTransaction;
        } else {
            updatedTransactions = [...transactions, newTransaction];
        }
    } else {
        newTransaction.trans_id = firebase.firestore().collection('dummy').doc().id; // Generate a new Firestore document ID
        updatedTransactions = [...transactions, newTransaction];
    }

    await dayDocRef.update({ transactions: updatedTransactions });

    return newTransaction;
}

async function updateReminder(reminder) {
    const usersCollection = firestoreInstance.collection(FirebaseNodes.USERS);
    const userId = getCurrentUser().uid;
    const userDocRef = usersCollection.doc(userId);

    let userDoc = await userDocRef.get();
    if (!userDoc.exists) {
        // Create new user
        await userDocRef.set({ reminders: [] });
        userDoc = await userDocRef.get();
    }

    const reminders = userDoc.data().reminders || [];
    let updatedReminders;

    const existingReminderIndex = reminders.findIndex(r => r.id === reminder.id);
    if (existingReminderIndex !== -1) {
        // Update existing reminder
        updatedReminders = [...reminders];
        updatedReminders[existingReminderIndex] = reminder;
    } else {
        // Add new reminder
        updatedReminders = [...reminders, reminder];
    }
    await userDocRef.update({ reminders: updatedReminders });

    return reminder;
}

const initialState = {
    trans_id: '',
    type: 'expense',
    amount: 0,
    note: '',
    category_id: '',
    created_at: formatDate(new Date()),
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
    people: [],
};

const addTransactionFormSlice = createSlice({
name: 'addTransactionForm',
    initialState,
    reducers: {
        setTransactionAmount: (state, action) => {
            state.amount = action.payload;
        },
        setTransactionNote: (state, action) => {
            state.note = action.payload;
        },
        setTransactionDate: (state, action) => {
            state.created_at = action.payload;
        },
        setTransactionWallet: (state, action) => {
            state.wallet = action.payload;
        },
        setTransactionPeople: (state, action) => {
            state.people = action.payload;
        },
        setTransactionCategory: (state, action) => {
            state.category_id = action.payload;
        },
        setTransactionType: (state, action) => {
            state.type = action.payload;
        },
        setTransactionReference: (state, action) => {
            state.reference = action.payload;
        },
        setTransactionReminderTime: (state, action) => {
            state.reminderTime = action.payload;
        },
        setTransactionReminderDate: (state, action) => {
            state.reminderDate = action.payload;
        },
        setTransactionHasReminder: (state, action) => {
            state.hasReminder = action.payload;
        },
        setTransactionHasTax: (state, action) => {
            state.hasTax = action.payload;
        },
        setTransactionInsurance: (state, action) => {
            state.insurance = action.payload;
        },
        setTransactionDependents: (state, action) => {
            state.dependents = action.payload;
        },
        clearInput: (state) => {
            Object.assign(state, initialState);
        },
        setDisplayModal: (state, action) => {
            state.displayModal = action.payload;
        }
    }
})

export {
    updateTransaction,
    updateReminder,
}

export const {
    setTransactionAmount,
    setTransactionNote,
    setTransactionDate,
    setTransactionWallet,
    setTransactionCategory,
    setTransactionPeople,
    setTransactionType,
    setTransactionReference,
    setTransactionReminderDate,
    setTransactionReminderTime,
    setTransactionHasReminder,
    setTransactionHasTax,
    setTransactionInsurance,
    setTransactionDependents,
    clearInput,
    setDisplayModal
} = addTransactionFormSlice.actions;

export default addTransactionFormSlice.reducer;