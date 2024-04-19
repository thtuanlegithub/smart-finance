import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/authentication';
import { addTransactionFormReducer } from '../features/transaction';
import { transactionReducer } from '../features/transaction';
import { budgetReducer } from '../features/budget';

export default configureStore({
    reducer: {
        login: authReducer,
        addTransactionForm: addTransactionFormReducer,
        transaction: transactionReducer,
        budget: budgetReducer
    },
});

