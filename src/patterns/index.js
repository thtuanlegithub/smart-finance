// Singleton pattern
// How to use: const firestoreInstance = FirestoreSingleton.getInstance().getFirestore();
// firestore.collection('users').doc('ABC123').get
export {default as FirestoreSingleton} from './singleton/FirestoreSingleton';

// Builder pattern
// How to use: const wallet = new WalletBuilder()
//                                 .setWalletId('123')
//                                 .setWalletName('My Wallet')
//                                 .setCurrencyId('USD')
//                                 .setBalance(100)
//                                 .setAccountId('456')
//                                 .build();
export {default as BudgetTargetTypeBuilder} from './builder/budget_target/budgetTargetTypeBuilder';
export {default as BudgetTargetBuilder} from './builder/budget_target/budgetTargetBuilder';

export {default as CategoryBuilder} from './builder/category/categoryBuilder';

export {default as CurrencyBuilder} from './builder/currency/currencyBuilder';    
export {default as ExchangeRateBuilder} from './builder/currency/exchangeRateBuilder';    

export {default as DebtCollectionBuilder} from './builder/debt_collection/debtCollectionBuilder';
export {default as LenderBuilder} from './builder/debt_collection/lenderBuilder';
export {default as LenderLoanBuilder} from './builder/debt_collection/lenderLoanBuilder'; 
export {default as LoanBuilder} from './builder/debt_collection/loanBuilder';

export {default as BorrowerBuilder} from './builder/repayment/borrowerBuilder';
export {default as BorrowerDebtBuilder} from './builder/repayment/borrowerDebtBuilder';
export {default as DebtBuilder} from './builder/repayment/debtBuilder';   
export {default as RepaymentBuilder} from './builder/repayment/repaymentBuilder';

export {default as StaticInvestmentBuilder} from './builder/investment/staticInvestmentBuilder';  
export {default as DynamicInvestmentBuilder} from './builder/investment/dynamicInvestmentBuilder';   

export {default as TransactionBuilder} from './builder/transaction/transactionBuilder';
export {default as TransactionTypeBuilder} from './builder/transaction/transactionTypeBuilder';
export {default as TaxBuilder} from './builder/transaction/taxBuilder';   

export {default as UserBuilder} from './builder/user/userBuilder';
export {default as SettingBuilder} from './builder/user/settingBuilder';
export {default as WalletBuilder} from './builder/user/walletBuilder';

// Strategy pattern
// How to use: const signInStrategy = new EmailPasswordSignInStrategy();
// signInStrategy.signIn(email, password);
export {default as SignInStrategy} from './strategy/SignInStrategy';