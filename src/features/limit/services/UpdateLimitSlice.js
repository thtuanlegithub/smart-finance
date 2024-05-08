import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    updateLimitBottomSheetDisplay: false,
    updateLimitTimeRange: null,
    updateLimitTimeRangeStart: null,
    updateLimitTimeRangeEnd: null,
    updateLimitCategory: null,
    updateLimitWallet: null,
}
const updateLimitSlice = createSlice({
    name: 'updateLimit',
    initialState,
    reducers: {
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
        clearUpdateLimitTimeRange: (state) => {
            state.updateLimitTimeRange = null;
            state.updateLimitTimeRangeStart = null;
            state.updateLimitTimeRangeEnd = null;
        },
    }
})

export const { setUpdateLimitBottomSheetDisplay, setUpdateLimitTimeRange, setUpdateLimitTimeRangeStart, setUpdateLimitTimeRangeEnd, clearUpdateLimitTimeRange } = updateLimitSlice.actions

export default updateLimitSlice.reducer;