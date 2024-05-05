import { View, Text } from 'react-native'
import React from 'react'
import { CardStyleInterpolators, TransitionSpecs, createStackNavigator } from '@react-navigation/stack'
import AddLimitForm from './AddLimitForm';
import SelectCategoryForm from '../../../transaction/pages/stack/add/SelectCategoryForm';
import WalletForm from '../../../transaction/pages/stack/add/WalletForm';

const AddLimitStack = createStackNavigator();

const AddLimitNavigator = () => {
    return (
        <AddLimitStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: TransitionSpecs.TransitionIOSSpec,
                    close: TransitionSpecs.TransitionIOSSpec,
                }
            }}>
            <AddLimitStack.Screen name='Add Limit' component={AddLimitForm} />
            <AddLimitStack.Screen name='Select Category' component={SelectCategoryForm} />
            <AddLimitStack.Screen name='Select Wallet' component={WalletForm} />
        </AddLimitStack.Navigator>
    )
}

export default AddLimitNavigator