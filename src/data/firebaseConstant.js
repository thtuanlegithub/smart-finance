export const FirebaseNodes = {
    USERS: 'users',

    TRANSACTION_TYPE: 'trans_type',
    TRANSACTION: 'trans',

    CURRENCY: 'currency',
    EXCHANGE_RATE: 'exchange_rate',

    CATEGORY: 'category',
    WALLET: 'wallet',

    BUDGET_TARGET: 'budget_target', 
    BUDGET_TARGET_TYPE: 'budget_target_type',

    STATIC_INVESTMENT: 'static_investment',
    DYNAMIC_INVESTMENT: 'dynamic_investment',   

    DEBT_COLLECTION: 'debt_collection',
    LOAN: 'loan',
    LENDER_LOAN: 'lender_loan',
    LENDER: 'lender',

    REPAYMENT: 'repayment',
    DEBT: 'debt',
    BORROWER_DEBT: 'borrower_debt', 
    BORROWER: 'borrower',

    SETTING: 'setting', 
};

export const UserFields = {
    USER_ID: 'uid',
    USERNAME: 'username',
    PASSWORD: 'password',
    EMAIL: 'email',
};

export const TransactionTypeFields = {
    TRANSACTION_TYPE_ID: 'trans_type_id',
    TRANSACTION_TYPE_NAME: 'trans_type_name',
};

export const TransactionFields = {
    TRANSACTION_ID: 'trans_id',
    CATEGORY_ID: 'category_id',
    AMOUNT: 'amount',
    NOTE: 'note',
    CREATED_AT: 'created_at',
    WALLED_ID: 'wallet_id',
};

export const CurrencyFields = {
    CURRENCY_ID: 'currency_id',
    CURRENCY_NAME: 'currency_name',
    SYMBOL: 'symbol',
};

export const ExchangeRateFields = {
    EXCHANGE_RATE_ID: 'exchange_rate_id',
    FROM_CURRENCY_ID: 'from_currency_id',
    TO_CURRENCY_ID: 'to_currency_id',
    RATE: 'rate',
    LAST_UPDATED: 'last_updated',
};

export const CategoryFields = { 
    CATEGORY_ID: 'category_id',
    CATEGORY_NAME: 'category_name',
    TRANSACTION_TYPE_ID: 'trans_type_id',   
};

export const WalletFields = {
    WALLET_ID: 'wallet_id',
    WALLET_NAME: 'wallet_name',
    CURRENCY_ID: 'currency_id',
    BALANCE: 'balance',
    ACCOUNT_ID: 'account_id',
};

export const BudgetTargetFields = { 
    BUDGET_TARGET_ID: 'budget_target_id',
    BUDGET_TARGET_TYPE_ID: 'budget_target_type_id',
    CATEGORY_ID: 'category_id',
    AMOUNT: 'amount',
    FROM_DATE: 'from_date',
    TO_DATE: 'to_date', 
    CREATED_AT: 'created_at',   
    WALLET_ID: 'wallet_id', 
};

export const BudgetTargetTypeFields = {
    BUDGET_TARGET_TYPE_ID: 'budget_target_type_id',
    BUDGET_TARGET_TYPE_NAME: 'budget_target_type_name',
};

export const StaticInvestmentFields = {
    STATIC_INVESTMENT_ID: 'static_investment_id',
    WALLET_ID: 'wallet_id',
    CAPITAL: 'capital',
    TERM: 'term',
    INTEREST_RATE: 'interest_rate',
    MATURITY_METHOD: 'maturity_method', 
    NOTE: 'note',
};

export const DynamicInvestmentFields = {
    DYNAMIC_INVESTMENT_ID: 'dynamic_investment_id',
    WALLET_ID: 'wallet_id',
    CAPITAL: 'capital',
    MATURITY_DATE: 'maturity_date',
    RESULT: 'result',
    NOTE: 'note',
};

export const DebtCollectionFields = {
    DEBT_COLLECTION_ID: 'debt_collection_id',
    TRANSACTION_ID: 'trans_id',
    LOAN_ID: 'loan_id',
};

export const LoanFields = {
    LOAN_ID: 'loan_id',
    TRANSACTION_ID: 'trans_id', 
    PAID: 'paid',
    REMAINING: 'remaining',
    REMIND_TIME: 'remind_time',
    IMAGE: 'image',
};

export const LenderLoanFields = {
    LENDER_LOAN_ID: 'lender_loan_id',
    LENDER_ID: 'lender_id',
    LOAN_ID: 'loan_id',
};

export const LenderFields = {
    LENDER_ID: 'lender_id',
    LENDER_NAME: 'lender_name',
    LENDER_PHONE: 'lender_phone',
};

export const RepaymentFields = {
    REPAYMENT_ID: 'repayment_id',
    TRANSACTION_ID: 'trans_id',
    DEBT_ID: 'debt_id',
};

export const DebtFields = {
    DEBT_ID: 'debt_id',
    TRANSACTION_ID: 'trans_id', 
    PAID: 'paid',
    REMAINING: 'remaining',
    REMIND_TIME: 'remind_time',
    IMAGE: 'image',
};

export const BorrowerDebtFields = {
    BORROWER_DEBT_ID: 'borrower_debt_id',
    BORROWER_ID: 'borrower_id',
    DEBT_ID: 'debt_id',
};

export const BorrowerFields = {
    BORROWER_ID: 'borrower_id',
    BORROWER_NAME: 'borrower_name',
    BORROWER_PHONE: 'borrower_phone',
};

export const SettingFields = {
    SETTING_ID: 'setting_id',
    NOTIFICATION_TIME: 'notify_time',
    LANGUAGE: 'language',
    ACCOUNT_ID: 'account_id',
};  