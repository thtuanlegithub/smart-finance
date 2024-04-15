import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    type: null,
    amount: '0',
    category: null,
    note: null,
    date: null,
    wallet: null,
    displayModal: null,
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
            state.date = action.payload;
        },
        setTransactionWallet: (state, action) => {
            state.wallet = action.payload;
        },
        setTransactionPeople: (state, action) => {
            state.people = action.payload;
        },
        setTransactionCategory: (state, action) => {
            state.category = action.payload;
        },
        setTransactionType: (state, action) => {
            state.type = action.payload;
        },
        setTransactionReference: (state, action) => {
            state.reference = action.payload;
        },
        clearInput: (state) => {
            Object.assign(state, initialState);
        },
        setDisplayModal: (state, action) => {
            state.displayModal = action.payload;
        }
    }
})

export const { setTransactionAmount, setTransactionNote, setTransactionDate, setTransactionWallet, setTransactionCategory, setTransactionPeople, setTransactionType, setTransactionReference, clearInput, setDisplayModal } = addTransactionFormSlice.actions;

export default addTransactionFormSlice.reducer;