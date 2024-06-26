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
import { deleteTransaction, setDisplayUpdateTransactionModal, setUpdateTransactionAmount, setUpdateTransactionCategory, setUpdateTransactionDate, setUpdateTransactionDependents, setUpdateTransactionHasReminder, setUpdateTransactionHasTax, setUpdateTransactionId, setUpdateTransactionInsurance, setUpdateTransactionNote, setUpdateTransactionPeople, setUpdateTransactionReference, setUpdateTransactionReminderDate, setUpdateTransactionType, setUpdateTransactionWallet } from '../../../services/updateTransactionFormSlice'
import { setCurrentTransactionCRUDAction } from '../../../services/transactionSlice'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import transactionType from '../../../data/transactionType'
import { setBalance, updateUserWallet, updateWallet } from '../../../../setting'

const TransactionDetail = ({ route }) => {
    const { transaction } = route.params;
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
    const updateTransactionBottomSheetRef = useRef(null);
    const updateTransactionDisplayModal = useSelector(state => state.updateTransactionForm.displayModal);
    const currentWallet = useSelector(state => state.wallet.currentWallet);

    useEffect(() => {
        if (updateTransactionDisplayModal) {
            updateTransactionBottomSheetRef.current.present();
        }
        else {
            updateTransactionBottomSheetRef.current.dismiss();
        }
    }, [updateTransactionDisplayModal]);
    const dispatch = useDispatch();

    const handleDeleteTransaction = async () => {
        let newWallet = { ...currentWallet };
        switch (transaction.type) {
            case transactionType.EXPENSE:
                newWallet.balance += transaction.amount; // Reverse the operation
                break;
            case transactionType.INCOME:
                newWallet.balance -= transaction.amount; // Reverse the operation
                break;
            case transactionType.DEBT_LOAN:
                switch (categoryId) {
                    case 'debt':
                    case 'debtcollection':
                        newWallet.balance -= transaction.amount; // Reverse the operation
                        break;
                    case 'loan':
                    case 'repayment':
                        newWallet.balance += transaction.amount; // Reverse the operation
                        break;
                }
                break;
        }

        await updateUserWallet(transaction.wallet_id, newWallet);
        await deleteTransaction(transaction); 
        dispatch(updateWallet(newWallet));
        if (currentWallet.wallet_id === newWallet.wallet_id)
            dispatch(setBalance(newWallet.balance));

        navigation.goBack();
    }

    const handleSaveTransaction = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <StackHeader
                title={t('transaction-detail')}
                onEditPress={() => {
                    dispatch(setCurrentTransactionCRUDAction('update'));
                    dispatch(setDisplayUpdateTransactionModal(true));
                    dispatch(setUpdateTransactionId(transaction.trans_id));
                    dispatch(setUpdateTransactionDate(transaction.created_at));
                    dispatch(setUpdateTransactionAmount(transaction.amount));
                    dispatch(setUpdateTransactionCategory(transaction.category_id));
                    dispatch(setUpdateTransactionType(transaction.type));
                    dispatch(setUpdateTransactionPeople(transaction.people || []));
                    dispatch(setUpdateTransactionInsurance(transaction.insurance || 0));
                    dispatch(setUpdateTransactionDependents(transaction.dependents || 0));
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
                <ExpenseDetail transaction={transaction}/>
            }
            {
                transaction?.type == 'income'
                &&
                <IncomeDetail transaction={transaction}/>
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
                }}>{t('delete')}</Text>
            </TouchableOpacity>
            <ConfirmDialog
                visible={confirmDialogVisible}
                title={t('delete-title')}
                message={t('delete-message')}
                onConfirm={() => {
                    handleDeleteTransaction()
                    setConfirmDialogVisible(false)
                }}
                onCancel={() => { setConfirmDialogVisible(false) }}
            />
            <UpdateTransactionBottomSheet
                selectedTransaction={transaction}
                updateTransactionBottomSheetRef={updateTransactionBottomSheetRef}
                onSave={handleSaveTransaction} 
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