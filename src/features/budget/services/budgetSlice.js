import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    budgetTypeFilter: 'Limit',
    budgetTimeRange: null,
    budgetTimeRangeStart: null,
    budgetTimeRangeEnd: null,
    selectedLimitItem: null,
    dataChange: false,
}
const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
        setBudgetTypeFilter: (state, action) => {
            state.budgetTypeFilter = action.payload
        },
        setBudgetTimeRange: (state, action) => {
            state.budgetTimeRange = action.payload
        },
        setBudgetTimeRangeStart: (state, action) => {
            state.budgetTimeRangeStart = action.payload
        },
        setBudgetTimeRangeEnd: (state, action) => {
            state.budgetTimeRangeEnd = action.payload
        },
        setSelectedLimitItem: (state, action) => {
            state.selectedLimitItem = action.payload
        },
        setDataChange: (state, action) => {
            state.dataChange = action.payload
        },  
        clearBudgetTimeRange(state) {
            state.budgetTimeRange = null
            state.budgetTimeRangeStart = null
            state.budgetTimeRangeEnd = null
        },
    }
})

export const { 
    setBudgetTypeFilter, 
    setBudgetTimeRange, 
    setBudgetTimeRangeStart, 
    setBudgetTimeRangeEnd, 
    setSelectedLimitItem,
    setDataChange, 
    clearBudgetTimeRange
} = budgetSlice.actions;

export default budgetSlice.reducer;