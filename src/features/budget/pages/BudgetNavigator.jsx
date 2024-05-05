import { View, Text } from 'react-native'
import React from 'react'
import { CardStyleInterpolators, TransitionSpecs, createStackNavigator } from '@react-navigation/stack'
import BudgetMain from './BudgetMain';
import LimitDetail from '../../limit/LimitDetail';
import TransactionDetail from '../../transaction/components/stack/detail/TransactionDetail';

const BudgetStack = createStackNavigator();

const BudgetNavigator = () => {
    return (
        <BudgetStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: TransitionSpecs.TransitionIOSSpec,
                    close: TransitionSpecs.TransitionIOSSpec,
                }
            }}>
            <BudgetStack.Screen name='Budget Main' component={BudgetMain} />
            <BudgetStack.Screen name='Limit Detail' component={LimitDetail} />
            <BudgetStack.Screen name='Limit Transaction Detail' component={TransactionDetail} />
        </BudgetStack.Navigator>
    )
}

export default BudgetNavigator