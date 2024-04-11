import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AddTransactionForm from './stack/AddTransactionForm';
import { View, Text } from 'react-native';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';

const Stack = createStackNavigator();

const AddTransactionNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Add Transaction" component={AddTransactionForm} />
        </Stack.Navigator>
    );
}

export default AddTransactionNavigator