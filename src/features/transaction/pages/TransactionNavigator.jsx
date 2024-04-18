import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack'
import TransactionMain from './TransactionMain'

const TransactionStack = createStackNavigator()

const TransactionNavigator = () => {
    return (
        <TransactionStack.Navigator
            screenOptions={
                {
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    transitionSpec: {
                        open: TransitionSpecs.TransitionIOSSpec,
                        close: TransitionSpecs.TransitionIOSSpec,
                    },
                }

            }>
            <TransactionStack.Screen name="Transaction Main" component={TransactionMain} />
        </TransactionStack.Navigator>
    )
}

export default TransactionNavigator