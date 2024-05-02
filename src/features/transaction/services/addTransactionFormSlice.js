import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionFields, FirebaseNodes } from "../../../data/firebaseConstant";
import { FirestoreSingleton } from "../../../patterns";
import formatTime from "../../../utils/formatTime";
import { formatDate } from "../../../utils/formatDate";
const firestoreInstance = FirestoreSingleton.getInstance().getFirestore();
const transactionCollection = firestoreInstance.collection(FirebaseNodes.TRANSACTION);

// Firebase services
async function updateTransaction(trans_id, newTransaction) {
    let docRef;
    if (trans_id) {
        docRef = transactionCollection.doc(trans_id);
        const doc = await docRef.get();

        if (doc.exists) {
            await docRef.update(newTransaction);
        }
    } else {
        docRef = await transactionCollection.add(newTransaction);
        const id = docRef.id;
        newTransaction.trans_id = id;
        await docRef.update(newTransaction);
    }

    const updatedTransaction = await docRef.get();
    return { id: docRef.id, ...updatedTransaction.data() };
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
    reference: null,
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
    clearInput,
    setDisplayModal
} = addTransactionFormSlice.actions;

export default addTransactionFormSlice.reducer;