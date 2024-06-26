import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/authentication';
import { addTransactionFormReducer } from '../features/transaction';
import { transactionReducer } from '../features/transaction';
import { budgetReducer } from '../features/budget';
import { currencyReducer } from '../features/setting';
import { settingReducer } from '../features/setting';
import { walletReducer } from '../features/setting';
import { categoryReducer } from '../features/category';
import { addLimitReducer } from '../features/limit';
import { updateTransactionFormReducer } from '../features/transaction';
import { updateLimitReducer } from '../features/limit';
import { addInvestmentReducer } from '../features/investment';
import { updateInvestmentReducer } from '../features/investment';
import { investmentReducer } from '../features/investment';
export default configureStore({
    reducer: {
        login: authReducer,
        addTransactionForm: addTransactionFormReducer,
        transaction: transactionReducer,
        currency: currencyReducer,
        budget: budgetReducer,
        setting: settingReducer,
        wallet: walletReducer,
        category: categoryReducer,
        updateLimit: updateLimitReducer,
        addLimit: addLimitReducer,
        updateTransactionForm: updateTransactionFormReducer,
        addInvestment: addInvestmentReducer,
        updateInvestment: updateInvestmentReducer,
        investment: investmentReducer,
    },
});

