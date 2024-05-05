import { View, Text } from 'react-native'
import React from 'react'
import SpendingTransaction from './ExpenseTransaction'
import IncomeTransaction from './IncomeTransaction'
import DebtLoanTransaction from './DebtLoanTransaction'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const Transaction = ({ item }) => {
    const navigation = useNavigation();

    return (
        <View>
            {
                item.type == 'Expense'
                &&
                <SpendingTransaction item={item} />
            }
            {
                item.type == 'Income'
                &&
                <IncomeTransaction item={item} />
            }
            {
                item.type == 'Debt/ Loan'
                &&
                <DebtLoanTransaction item={item} />
            }
        </View>
    )
}

export default Transaction