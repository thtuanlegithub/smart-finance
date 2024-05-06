import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addLimitBottomSheetDisplay: null,
    addLimitTimeRange: null,
    addLimitTimeRangeStart: null,
    addLimitTimeRangeEnd: null,
    addLimitCategory: null,
    addLimitWallet: null,
}
const addLimitSlice = createSlice({
    name: 'addLimit',
    initialState,
    reducers: {
        setAddLimitBottomSheetDisplay: (state, action) => {
            state.addLimitBottomSheetDisplay = action.payload;
        },
        setAddLimitTimeRange: (state, action) => {
            state.addLimitTimeRange = action.payload;
        },
        setAddLimitTimeRangeStart: (state, action) => {
            state.addLimitTimeRangeStart = action.payload;
        },
        setAddLimitTimeRangeEnd: (state, action) => {
            state.addLimitTimeRangeEnd = action.payload;
        },
        setAddLimitCategory: (state, action) => {
            state.addLimitCategory = action.payload;
        },
        setAddLimitWallet: (state, action) => {
            state.addLimitWallet = action.payload;
        },
        clearAddLimitTimeRange: (state) => {
            state.addLimitTimeRange = null;
            state.addLimitTimeRangeStart = null;
            state.addLimitTimeRangeEnd = null;
        },
    }
})

export const { setAddLimitBottomSheetDisplay, setAddLimitTimeRange, setAddLimitTimeRangeStart, setAddLimitTimeRangeEnd, clearAddLimitTimeRange } = addLimitSlice.actions

export default addLimitSlice.reducer;