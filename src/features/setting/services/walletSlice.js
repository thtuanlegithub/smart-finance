import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    walletId: '',
    name: '',
    balance: 0,
    currencyId: 'VND',
    accountId: '',
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState: initialState,
    reducers: {  
        setWalletId(state, action) {
            state.walletId = action.payload;
        },
        setName(state, action) {
            state.name = action.payload;
        },
        setBalance(state, action) {
            state.balance = action.payload;
        },
        setCurrencyId(state, action) {
            state.currencyId = action.payload;
        },
        setAccountId(state, action) {
            state.accountId = action.payload;
        },
    },
});

export default walletSlice.reducer; 