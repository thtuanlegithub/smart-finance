import { createSlice } from "@reduxjs/toolkit";
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

export const { setCurrentWallet, setTransactionTypeFilter, setTransactionTimeRange, setTransactionTimeRangeStart, setTransactionTimeRangeEnd, setCurrentTransactionCRUDAction, clearTransactionTimeRange } = transactionSlice.actions;

export default transactionSlice.reducer;