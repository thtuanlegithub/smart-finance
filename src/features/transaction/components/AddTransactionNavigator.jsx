import React, { useState } from 'react'
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack'
import AddTransactionForm from '../pages/stack/add/AddTransactionForm';

import SelectCategoryForm from '../pages/stack/add/SelectCategoryForm';
import NoteForm from '../pages/stack/add/NoteForm';
import WalletForm from '../pages/stack/add/WalletForm';
import SelectLoanForm from '../pages/stack/add/SelectLoanForm';
import SelectDebtForm from '../pages/stack/add/SelectDebtForm';
import TaxForm from '../pages/stack/add/TaxForm';
import PeopleForm from '../pages/stack/add/PeopleForm';
import ReminderForm from '../pages/stack/add/ReminderForm';

const AddTransactionStack = createStackNavigator();

const AddTransactionNavigator = () => {
    return (
        <AddTransactionStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: TransitionSpecs.TransitionIOSSpec,
                    close: TransitionSpecs.TransitionIOSSpec,
                },
            }}>
            <AddTransactionStack.Screen name="Add Transaction" component={AddTransactionForm} />
            <AddTransactionStack.Screen name="Select Category" component={SelectCategoryForm} />
            <AddTransactionStack.Screen name="Note" component={NoteForm} />
            <AddTransactionStack.Screen name="Wallet" component={WalletForm} />
            <AddTransactionStack.Screen name="Select Loan" component={SelectLoanForm} />
            <AddTransactionStack.Screen name="Select Debt" component={SelectDebtForm} />
            <AddTransactionStack.Screen name="Calculate Tax" component={TaxForm} />
            <AddTransactionStack.Screen name="People" component={PeopleForm} />
            <AddTransactionStack.Screen name="Reminder" component={ReminderForm} />
        </AddTransactionStack.Navigator>
    );
}

export default AddTransactionNavigator