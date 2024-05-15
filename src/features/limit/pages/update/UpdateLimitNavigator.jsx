import { View, Text } from 'react-native'
import React from 'react'
import { CardStyleInterpolators, TransitionSpecs, createStackNavigator } from '@react-navigation/stack'
import UpdateLimitForm from './UpdateLimitForm';
import SelectLimitCategoryForm from '../SelectLimitCategoryForm';
import WalletForm from '../../../transaction/pages/stack/add/WalletForm';

const UpdateLimitStack = createStackNavigator();


const UpdateLimitNavigator = () => {
    return (
        <UpdateLimitStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: TransitionSpecs.TransitionIOSSpec,
                    close: TransitionSpecs.TransitionIOSSpec,
                }
            }}>
            <UpdateLimitStack.Screen name='Update Limit' component={UpdateLimitForm} />
            <UpdateLimitStack.Screen name='Select Limit Category' component={SelectLimitCategoryForm} />
            <UpdateLimitStack.Screen name='Select Wallet' component={WalletForm} />
        </UpdateLimitStack.Navigator>
    )
}

export default UpdateLimitNavigator