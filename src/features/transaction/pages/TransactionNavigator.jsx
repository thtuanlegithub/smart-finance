import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack'
import TransactionMain from './TransactionMain'
import TransactionDetail from './stack/detail/TransactionDetail'
import ListRepayment from './stack/detail/ListRepayment'
import ListDebtCollection from './stack/detail/ListDebtCollection'

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
            <TransactionStack.Screen name="Transaction Detail" component={TransactionDetail} />
            <TransactionStack.Screen name="List Repayment" component={ListRepayment} />
            <TransactionStack.Screen name="List Debt Collection" component={ListDebtCollection} />
        </TransactionStack.Navigator>
    )
}

export default TransactionNavigator