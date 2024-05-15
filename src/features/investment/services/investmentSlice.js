import { createSlice } from "@reduxjs/toolkit";

const initialSlice = {
    currentInvestmentCRUDAction: null,
}
const investmentSlice = createSlice({
    name: 'investment',
    initialState: initialSlice,
    reducers: {
        setCurrentInvestmentCRUDAction: (state, action) => {
            state.currentInvestmentCRUDAction = action.payload
        },
    }
})

export const { setCurrentInvestmentCRUDAction } = investmentSlice.actions;

export default investmentSlice.reducer;