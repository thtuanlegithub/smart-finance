import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/authentication';
import { addTransactionFormReducer } from '../features/transaction';
import { transactionReducer } from '../features/transaction';
import { budgetReducer } from '../features/budget';
import { currencyReducer } from '../features/setting';
import { settingReducer } from '../features/setting';
export default configureStore({
        reducer: {
            login: authReducer,
            addTransactionForm: addTransactionFormReducer,
            transaction: transactionReducer,
            currency: currencyReducer,
            budget: budgetReducer, 
            setting: settingReducer,
        },
});

