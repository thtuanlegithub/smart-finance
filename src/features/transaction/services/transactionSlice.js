import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    transactionTypeFilter: null,
    timeRange: null,
    timeRangeStart: null,
    timeRangeEnd: null,
    currentWallet: {
        amount: null,
        name: null,
    },
};
const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        setTransactionTypeFilter: (state, action) => {
            state.transactionTypeFilter = action.payload;
        },
        setTimeRange: (state, action) => {
            state.timeRange = action.payload;
        },
        setTimeRangeStart: (state, action) => {
            state.timeRangeStart = action.payload;
        },
        setTimeRangeEnd: (state, action) => {
            state.timeRangeEnd = action.payload;
        },
        setCurrentWallet: (state, action) => {
            state.currentWallet = action.payload;
        },
        clearTimeRange(state) {
            state.timeRange = null;
            state.timeRangeStart = null;
            state.timeRangeEnd = null;
        },
    }
})

export const { setCurrentWallet, setTransactionTypeFilter, setTimeRange, setTimeRangeStart, setTimeRangeEnd, clearTimeRange } = transactionSlice.actions;

export default transactionSlice.reducer;