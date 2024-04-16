import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/authentication';
import { addTransactionFormReducer } from '../features/transaction';
import { transactionReducer } from '../features/transaction';
export default configureStore({
    reducer: {
        login: authReducer,
        addTransactionForm: addTransactionFormReducer,
        transaction: transactionReducer,
    },
});

