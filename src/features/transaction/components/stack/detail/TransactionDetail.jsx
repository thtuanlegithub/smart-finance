import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import TransactionNavigationHeader from '../../TransactionNavigationHeader'
import { useNavigation } from '@react-navigation/native'
import ExpenseDetail from './ExpenseDetail'
import IncomeDetail from './IncomeDetail'
import DebtLoanDetail from './DebtLoanDetail'
import colors from '../../../../../styles/colors'
import typography from '../../../../../styles/typography'
import ConfirmDialog from '../../../../../components/ConfirmDialog'

const TransactionDetail = ({ route }) => {
    const navigation = useNavigation();
    const { transaction } = route.params;
    console.log(transaction);
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
    return (
        <View style={styles.container}>
            <TransactionNavigationHeader
                onBackPress={
                    () => {
                        navigation.navigate("Transaction Main")
                    }}
                title='Transaction Detail' />
            {
                transaction?.type == 'Expense'
                &&
                <ExpenseDetail transaction={transaction} />
            }
            {
                transaction?.type == 'Income'
                &&
                <IncomeDetail transaction={transaction} />
            }
            {
                transaction?.type == 'Debt/ Loan'
                &&
                <DebtLoanDetail transaction={transaction} />
            }
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setConfirmDialogVisible(true)}>
                <Text style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    paddingVertical: 16,
                    backgroundColor: 'white',
                    color: colors.red01,
                    marginTop: 4,
                    ...typography.MediumInterH4
                }}>Delete</Text>
            </TouchableOpacity>
            <ConfirmDialog
                visible={confirmDialogVisible}
                title='Delete Transaction'
                message='Are you sure you want to delete this transaction?'
                onConfirm={() => {
                    // handleDelete
                    setConfirmDialogVisible(false)
                }}
                onCancel={() => { setConfirmDialogVisible(false) }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    transactionCard: {
        marginTop: 2,
        backgroundColor: 'white',
        padding: 16,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})

export default TransactionDetail