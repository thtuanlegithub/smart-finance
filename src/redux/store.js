import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/authentication';

export default configureStore({
    reducer: {
        login: authReducer,
    }
});

