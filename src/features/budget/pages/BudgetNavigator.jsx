import { View, Text } from 'react-native'
import React from 'react'
import { CardStyleInterpolators, TransitionSpecs, createStackNavigator } from '@react-navigation/stack'
import BudgetMain from './BudgetMain';

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
        </BudgetStack.Navigator>
    )
}

export default BudgetNavigator