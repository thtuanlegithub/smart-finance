import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    updateInvestmentBottomSheetDisplay: false,
    updateInvestmentName: null,
    updateInvestmentCategory: null,
    updateInvestmentPrinciple: null,
    updateInvestmentNote: null,
    updateInvestmentWallet: null,
    updateInvestmentTimeRange: null,
    updateInvestmentTimeRangeStart: null,
    updateInvestmentTimeRangeEnd: null,
    updateInvestmentCircle: null,
    updateInvestmentMaturity: null,
}

const updateInvestmentSlice = createSlice({
    name: 'updateInvestment',
    initialState,
    reducers: {
        setUpdateInvestmentBottomSheetDisplay: (state, action) => {
            state.updateInvestmentBottomSheetDisplay = action.payload;
        },
        setUpdateInvestmentName: (state, action) => {
            state.updateInvestmentName = action.payload;
        },
        setUpdateInvestmentCategory: (state, action) => {
            state.updateInvestmentCategory = action.payload;
        },
        setUpdateInvestmentPrinciple: (state, action) => {
            state.updateInvestmentPrinciple = action.payload;
        },
        setUpdateInvestmentNote: (state, action) => {
            state.updateInvestmentNote = action.payload;
        },
        setUpdateInvestmentWallet: (state, action) => {
            state.updateInvestmentWallet = action.payload;
        },
        setUpdateInvestmentTimeRange: (state, action) => {
            state.updateInvestmentTimeRange = action.payload;
        },
        setUpdateInvestmentTimeRangeStart: (state, action) => {
            state.updateInvestmentTimeRangeStart = action.payload;
        },
        setUpdateInvestmentTimeRangeEnd: (state, action) => {
            state.updateInvestmentTimeRangeEnd = action.payload;
        },
        setUpdateInvestmentCircle: (state, action) => {
            state.updateInvestmentCircle = action.payload;
        },
        setUpdateInvestmentMaturity: (state, action) => {
            state.updateInvestmentMaturity = action.payload;
        },
        clearUpdateInvestmentTimeRange: (state) => {
            state.updateInvestmentTimeRange = null;
            state.updateInvestmentTimeRangeStart = null;
            state.updateInvestmentTimeRangeEnd = null;
        }
    }
})

export const {
    setUpdateInvestmentBottomSheetDisplay,
    setUpdateInvestmentName,
    setUpdateInvestmentCategory,
    setUpdateInvestmentPrinciple,
    setUpdateInvestmentNote,
    setUpdateInvestmentWallet,
    setUpdateInvestmentTimeRange,
    setUpdateInvestmentTimeRangeStart,
    setUpdateInvestmentTimeRangeEnd,
    setUpdateInvestmentCircle,
    setUpdateInvestmentMaturity,
    clearUpdateInvestmentTimeRange,
} = updateInvestmentSlice.actions;

export default updateInvestmentSlice.reducer;