import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

const authSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        }
        // other reducers...
    },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;