import React, { useState } from 'react'
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack'
import AddTransactionForm from './stack/AddTransactionForm';

import SelectCategoryForm from './stack/SelectCategoryForm';

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
        </AddTransactionStack.Navigator>
    );
}

export default AddTransactionNavigator