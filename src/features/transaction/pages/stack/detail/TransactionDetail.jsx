import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ExpenseDetail from './ExpenseDetail'
import IncomeDetail from './IncomeDetail'
import DebtLoanDetail from './DebtLoanDetail'
import colors from '../../../../../styles/colors'
import typography from '../../../../../styles/typography'
import ConfirmDialog from '../../../../../components/ConfirmDialog'
import StackHeader from '../../../../../components/StackHeader'
import UpdateTransactionBottomSheet from '../../../components/UpdateTransactionBottomSheet'
import { useDispatch, useSelector } from 'react-redux'
import { setDisplayUpdateTransactionModal, setUpdateTransactionAmount, setUpdateTransactionCategory, setUpdateTransactionDate, setUpdateTransactionDependents, setUpdateTransactionHasReminder, setUpdateTransactionHasTax, setUpdateTransactionInsurance, setUpdateTransactionNote, setUpdateTransactionPeople, setUpdateTransactionReference, setUpdateTransactionReminderDate, setUpdateTransactionType, setUpdateTransactionWallet } from '../../../services/updateTransactionFormSlice'
import { formatDate } from '../../../../../utils/formatDate'
import { setCurrentTransactionCRUDAction } from '../../../services/transactionSlice'

const TransactionDetail = ({ route }) => {
    const { transaction } = route.params;
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
    const updateTransactionBottomSheetRef = useRef(null);
    const updateTransactionDisplayModal = useSelector(state => state.updateTransactionForm.displayModal);
    useEffect(() => {
        if (updateTransactionDisplayModal) {
            updateTransactionBottomSheetRef.current.present();
        }
        else {
            updateTransactionBottomSheetRef.current.dismiss();
        }
    }, [updateTransactionDisplayModal]);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <StackHeader
                title='Transaction Detail'
                onEditPress={() => {
                    dispatch(setCurrentTransactionCRUDAction('update'));
                    dispatch(setDisplayUpdateTransactionModal(true));
                    dispatch(setUpdateTransactionDate(transaction.created_at));
                    dispatch(setUpdateTransactionAmount(transaction.amount));
                    dispatch(setUpdateTransactionCategory(transaction.category));
                    dispatch(setUpdateTransactionType(transaction.type));
                    dispatch(setUpdateTransactionPeople(transaction.people));
                    dispatch(setUpdateTransactionInsurance(transaction.insurance));
                    dispatch(setUpdateTransactionDependents(transaction.dependents));
                    dispatch(setUpdateTransactionHasTax(transaction.hasTax));
                    dispatch(setUpdateTransactionReference(transaction.reference));
                    dispatch(setUpdateTransactionNote(transaction.note));
                    dispatch(setUpdateTransactionWallet(transaction.wallet));
                    dispatch(setUpdateTransactionHasReminder(transaction.hasReminder));
                }}
            />
            {
                transaction?.type == 'expense'
                &&
                <ExpenseDetail transaction={transaction} />
            }
            {
                transaction?.type == 'income'
                &&
                <IncomeDetail transaction={transaction} />
            }
            {
                transaction?.type == 'debt_loan'
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
            <UpdateTransactionBottomSheet
                selectedTransaction={transaction}
                updateTransactionBottomSheetRef={updateTransactionBottomSheetRef} />
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