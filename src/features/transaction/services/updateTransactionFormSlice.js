import { createSlice } from "@reduxjs/toolkit";
import formatTime from "../../../utils/formatTime";
import { formatDate } from "../../../utils/formatDate";

const initialState = {
    trans_id: '',
    type: 'expense',
    amount: 0,
    note: '',
    category_id: '',
    created_at: '',
    wallet: '',
    displayModal: false,
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


const updateTransactionFormSlice = createSlice({
    name: 'updateTransactionForm',
    initialState,
    reducers: {
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

export default updateTransactionFormSlice.reducer;