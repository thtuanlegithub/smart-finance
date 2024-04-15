import React, { useState } from 'react'
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack'
import AddTransactionForm from './stack/AddTransactionForm';

import SelectCategoryForm from './stack/SelectCategoryForm';
import NoteForm from './stack/NoteForm';
import WalletForm from './stack/WalletForm';

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
            {/* <AddTransactionStack.Screen name="Note" component={NoteForm} /> */}
        </AddTransactionStack.Navigator>
    );
}

export default AddTransactionNavigator