import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    addInvestmentBottomSheetDisplay: false,
    addInvestmentName: null,
    addInvestmentCategory: null,
    addInvestmentPrinciple: null,
    addInvestmentNote: null,
    addInvestmentWallet: null,
    addInvestmentTimeRange: null,
    addInvestmentTimeRangeStart: null,
    addInvestmentTimeRangeEnd: null,
    addInvestmentCircle: null,
    addInvestmentMaturity: null,
}

const addInvestmentSlice = createSlice({
    name: 'addInvestment',
    initialState,
    reducers: {
        setAddInvestmentBottomSheetDisplay: (state, action) => {
            state.addInvestmentBottomSheetDisplay = action.payload;
        },
        setAddInvestmentName: (state, action) => {
            state.addInvestmentName = action.payload;
        },
        setAddInvestmentCategory: (state, action) => {
            state.addInvestmentCategory = action.payload;
        },
        setAddInvestmentPrinciple: (state, action) => {
            state.addInvestmentPrinciple = action.payload;
        },
        setAddInvestmentNote: (state, action) => {
            state.addInvestmentNote = action.payload;
        },
        setAddInvestmentWallet: (state, action) => {
            state.addInvestmentWallet = action.payload;
        },
        setAddInvestmentTimeRange: (state, action) => {
            state.addInvestmentTimeRange = action.payload;
        },
        setAddInvestmentTimeRangeStart: (state, action) => {
            state.addInvestmentTimeRangeStart = action.payload;
        },
        setAddInvestmentTimeRangeEnd: (state, action) => {
            state.addInvestmentTimeRangeEnd = action.payload;
        },
        setAddInvestmentCircle: (state, action) => {
            state.addInvestmentCircle = action.payload;
        },
        setAddInvestmentMaturity: (state, action) => {
            state.addInvestmentMaturity = action.payload;
        },
        clearAddInvestmentTimeRange: (state) => {
            state.addInvestmentTimeRange = null;
            state.addInvestmentTimeRangeStart = null;
            state.addInvestmentTimeRangeEnd = null;
        }
    }
})

export const {
    setAddInvestmentBottomSheetDisplay,
    setAddInvestmentName,
    setAddInvestmentCategory,
    setAddInvestmentPrinciple,
    setAddInvestmentNote,
    setAddInvestmentWallet,
    setAddInvestmentTimeRange,
    setAddInvestmentTimeRangeStart,
    setAddInvestmentTimeRangeEnd,
    setAddInvestmentCircle,
    setAddInvestmentMaturity,
    clearAddInvestmentTimeRange,
} = addInvestmentSlice.actions;

export default addInvestmentSlice.reducer;