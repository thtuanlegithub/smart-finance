import { View, Text } from 'react-native'
import React from 'react'
import { CardStyleInterpolators, TransitionSpecs, createStackNavigator } from '@react-navigation/stack'
import AddInvestmentForm from './AddInvestmentForm'
import SelectInvestmentCategoryForm from '../components/SelectInvestmentCategoryForm'
import InvestmentNoteForm from '../components/InvestmentNoteForm'
import WalletForm from '../../transaction/pages/stack/add/WalletForm'

const AddInvestmentStack = createStackNavigator()

const AddInvestmentNavigator = () => {
    return (
        <AddInvestmentStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: TransitionSpecs.TransitionIOSSpec,
                    close: TransitionSpecs.TransitionIOSSpec,
                }
            }}>
            <AddInvestmentStack.Screen name='Add Investment' component={AddInvestmentForm} />
            <AddInvestmentStack.Screen name='Select Investment Category' component={SelectInvestmentCategoryForm} />
            <AddInvestmentStack.Screen name='Investment Note' component={InvestmentNoteForm} />
            <AddInvestmentStack.Screen name='Select Wallet' component={WalletForm} />
        </AddInvestmentStack.Navigator>
    )
}

export default AddInvestmentNavigator