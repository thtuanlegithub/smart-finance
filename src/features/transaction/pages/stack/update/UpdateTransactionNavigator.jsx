import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack'
import UpdateTransactionForm from './UpdateTransactionForm';
import SelectCategoryForm from '../add/SelectCategoryForm';
import NoteForm from '../add/NoteForm';
import WalletForm from '../add/WalletForm';
import SelectLoanForm from '../add/SelectLoanForm';
import SelectDebtForm from '../add/SelectDebtForm';
import TaxForm from '../add/TaxForm';
import PeopleForm from '../add/PeopleForm';
import ReminderForm from '../add/ReminderForm';

const UpdateTransactionStack = createStackNavigator();

const UpdateTransactionNavigator = () => {
    return (
        <UpdateTransactionStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: TransitionSpecs.TransitionIOSSpec,
                    close: TransitionSpecs.TransitionIOSSpec,
                },
            }}>
            <UpdateTransactionStack.Screen name="Update Transaction" component={UpdateTransactionForm} />
            <UpdateTransactionStack.Screen name="Select Category" component={SelectCategoryForm} />
            <UpdateTransactionStack.Screen name="Note" component={NoteForm} />
            <UpdateTransactionStack.Screen name="Wallet" component={WalletForm} />
            <UpdateTransactionStack.Screen name="Select Loan" component={SelectLoanForm} />
            <UpdateTransactionStack.Screen name="Select Debt" component={SelectDebtForm} />
            <UpdateTransactionStack.Screen name="Calculate Tax" component={TaxForm} />
            <UpdateTransactionStack.Screen name="People" component={PeopleForm} />
            <UpdateTransactionStack.Screen name="Reminder" component={ReminderForm} />
        </UpdateTransactionStack.Navigator>
    )
}


export default UpdateTransactionNavigator