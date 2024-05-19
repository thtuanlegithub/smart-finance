import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    updateLimitId: '',
    updateLimitBottomSheetDisplay: false,
    updateLimitTimeRange: null,
    updateLimitTimeRangeStart: null,
    updateLimitTimeRangeEnd: null,
    updateLimitCategory: null,
    updateLimitWallet: null,
    updateLimitAmount: 0,
    navigationGoBack: false,
}
const updateLimitSlice = createSlice({
    name: 'updateLimit',
    initialState,
    reducers: {
        setUpdateLimitId: (state, action) => {
            state.updateLimitId = action.payload;
        },
        setUpdateLimitBottomSheetDisplay: (state, action) => {
            state.updateLimitBottomSheetDisplay = action.payload;
        },
        setUpdateLimitTimeRange: (state, action) => {
            state.updateLimitTimeRange = action.payload;
        },
        setUpdateLimitTimeRangeStart: (state, action) => {
            state.updateLimitTimeRangeStart = action.payload;
        },
        setUpdateLimitTimeRangeEnd: (state, action) => {
            state.updateLimitTimeRangeEnd = action.payload;
        },
        setUpdateLimitCategory: (state, action) => {
            state.updateLimitCategory = action.payload;
        },
        setUpdateLimitWallet: (state, action) => {
            state.updateLimitWallet = action.payload;
        },
        setUpdateLimitAmount: (state, action) => {
            state.updateLimitAmount = action.payload;
        },  
        setNavigationGoBack: (state, action) => {
            state.navigationGoBack = action.payload;
        },
        clearUpdateLimitTimeRange: (state) => {
            state.updateLimitTimeRange = null;
            state.updateLimitTimeRangeStart = null;
            state.updateLimitTimeRangeEnd = null;
        },
    }
})

export const { 
    setUpdateLimitId,
    setUpdateLimitBottomSheetDisplay, 
    setUpdateLimitTimeRange, 
    setUpdateLimitTimeRangeStart, 
    setUpdateLimitTimeRangeEnd,
    setUpdateLimitAmount, 
    setUpdateLimitWallet,
    setUpdateLimitCategory,
    setNavigationGoBack,
    clearUpdateLimitTimeRange
} = updateLimitSlice.actions

export default updateLimitSlice.reducer;