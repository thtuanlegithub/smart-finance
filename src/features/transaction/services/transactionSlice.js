import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    transactionTypeFilter: null,
    budgetTimeRange: null,
    budgetTimeRangeStart: null,
    budgetTimeRangeEnd: null,
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
        setBudgetTimeRange: (state, action) => {
            state.budgetTimeRange = action.payload;
        },
        setBudgetTimeRangeStart: (state, action) => {
            state.budgetTimeRangeStart = action.payload;
        },
        setBudgetTimeRangeEnd: (state, action) => {
            state.budgetTimeRangeEnd = action.payload;
        },
        setCurrentWallet: (state, action) => {
            state.currentWallet = action.payload;
        },
        clearBudgetTimeRange(state) {
            state.budgetTimeRange = null;
            state.budgetTimeRangeStart = null;
            state.budgetTimeRangeEnd = null;
        },
    }
})

export const { setCurrentWallet, setTransactionTypeFilter, setBudgetTimeRange, setBudgetTimeRangeStart, setBudgetTimeRangeEnd, clearBudgetTimeRange } = transactionSlice.actions;

export default transactionSlice.reducer;