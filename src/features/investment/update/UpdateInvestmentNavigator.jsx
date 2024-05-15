import { View, Text } from 'react-native'
import React from 'react'
import { CardStyleInterpolators, TransitionSpecs, createStackNavigator } from '@react-navigation/stack'
import SelectInvestmentCategoryForm from '../components/SelectInvestmentCategoryForm'
import InvestmentNoteForm from '../components/InvestmentNoteForm'
import UpdateInvestmentForm from './UpdateInvestmentForm'
import WalletForm from '../../transaction/pages/stack/add/WalletForm'

const UpdateInvestmentStack = createStackNavigator()

const UpdateInvestmentNavigator = () => {
    return (
        <UpdateInvestmentStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: TransitionSpecs.TransitionIOSSpec,
                    close: TransitionSpecs.TransitionIOSSpec,
                }
            }}>
            <UpdateInvestmentStack.Screen name='Update Investment' component={UpdateInvestmentForm} />
            <UpdateInvestmentStack.Screen name='Select Investment Category' component={SelectInvestmentCategoryForm} />
            <UpdateInvestmentStack.Screen name='Investment Note' component={InvestmentNoteForm} />
            <UpdateInvestmentStack.Screen name='Select Wallet' component={WalletForm} />
        </UpdateInvestmentStack.Navigator>
    )
}

export default UpdateInvestmentNavigator