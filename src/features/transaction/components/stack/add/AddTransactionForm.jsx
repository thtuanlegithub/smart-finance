import { View, Text, KeyboardAvoidingView } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import styles from '../../../styles/AddTransactionFormStyles'
import MoneyInput from '../../../../../components/MoneyInput'
import SelectCategoryInput from '../../SelectCategoryInput'
import MediumTextIconInput from '../../MediumTextIconInput'
import NoOutlinedMediumTextIconInput from '../../NoOutlinedMediumTextIconInput'
import W1Button from '../../../../../components/W1Button'
import DatePicker from 'react-native-date-picker'
import ActionSheet from 'react-native-actions-sheet'
import typography from '../../../../../styles/typography'
import colors from '../../../../../styles/colors'
import BottomMenuItem from '../../../../../components/BottomMenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { clearInput, setDisplayModal, setTransactionAmount, setTransactionDate, updateTransaction } from '../../../services/addTransactionFormSlice'
import { formatDate } from '../../../../../utils/formatDate'
import LoanInformation from '../../../../category/components/LoanInformation'
import DebtInformation from '../../../../category/components/DebtInformation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TransactionBuilder } from '../../../../../patterns'
import { setBalance, updateUserWallet } from '../../../../setting'
import transactionType from '../../../data/transactionType'
import { updateWallet } from '../../../../setting'
const TODAY = 0;
const YESTERDAY = 1;
const CUSTOM = 2;

const AddTransactionForm = ({ navigation }) => {

    // Handle Action Sheet - Bottom Menu
    const [open, setOpen] = useState(false)
    const actionSheetRef = useRef(null)

    // redux selector
    const dispatch = useDispatch();
    const note = useSelector(state => state.addTransactionForm.note);
    const created_at = useSelector(state => state.addTransactionForm.created_at);
    const amount = useSelector(state => state.addTransactionForm.amount);
    const wallet = useSelector(state => state.addTransactionForm.wallet);
    const category = useSelector(state => state.category.currentCategory);
    const type = useSelector(state => state.addTransactionForm.type);
    const currentWallet = useSelector(state => state.wallet.currentWallet);

    // Handle Select Transaction Date
    const handlePress = (index) => {
        if (index === TODAY) {
            dispatch(setTransactionDate(formatDate(new Date())));
            actionSheetRef.current?.setModalVisible(false)
        } else if (index === YESTERDAY) {
            let yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            dispatch(setTransactionDate(formatDate(yesterday)));
            actionSheetRef.current?.setModalVisible(false)
        } else if (index === CUSTOM) {
            setOpen(true)
        }
    }

    const handleAmountChange = (amount) => {
        amount = parseInt(amount);
        dispatch(setTransactionAmount(amount));
    }

    const handleSaveTransaction = () => {
        if (!created_at || !amount || !wallet || !category) {
            alert('Please fill in all required fields');
            return;
        }

        dispatch(setDisplayModal(false));
        dispatch(clearInput());

        const newTransaction = new TransactionBuilder()
            .setAmount(amount)
            .setCategoryId(category.id)
            .setCreatedAt(created_at)
            .setNote(note)
            .setWalletId(wallet.wallet_id)
            .build();

        let newWallet = { ...wallet };
        switch (type) {
            case transactionType.EXPENSE:
                newWallet.balance -= amount;
                break;
            case transactionType.INCOME:
                newWallet.balance += amount;
                break;
            case transactionType.DEBT_LOAN:
                switch (category.id) {
                    case 'debt':
                    case 'debtcollection':
                        newWallet.balance += amount;
                        break;
                    case 'loan':
                    case 'repayment':
                        newWallet.balance -= amount;
                        break;
                }
                break;
        }

        updateUserWallet(wallet.wallet_id, newWallet);
        updateTransaction('', newTransaction);
        dispatch(updateWallet(newWallet));
        if (currentWallet.wallet_id === wallet.wallet_id)
            dispatch(setBalance(newWallet.balance));
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}>
            <View>
                <Text style={styles.title}>Add Transaction</Text>
                <View style={styles.form}>
                    <View style={{ marginTop: 8 }}>
                        <MoneyInput
                            onChange={(amount) => handleAmountChange(amount)}
                            value={amount} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Select Category")}>
                        <SelectCategoryInput />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Note")}>
                        <MediumTextIconInput value={note}
                            field='note'
                            placeholder='Note' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => actionSheetRef.current?.setModalVisible(true)}>
                        <MediumTextIconInput
                            value={created_at}
                            field='date'
                            placeholder='Pick a day' />
                    </TouchableOpacity>
                    <ActionSheet ref={actionSheetRef}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                            <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>Select a day</Text>
                            <TouchableOpacity
                                onPress={() => handlePress(TODAY)}
                                style={styles.bottomMenuItemContainer}>
                                <BottomMenuItem title='Today' />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handlePress(YESTERDAY)}
                                style={styles.bottomMenuItemContainer}>
                                <BottomMenuItem title='Yesterday' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handlePress(CUSTOM)} style={styles.bottomMenuItemContainer}>
                                <BottomMenuItem title='Custom' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => actionSheetRef.current?.setModalVisible(false)} style={styles.bottomMenuItemContainer}>
                                <Text style={[typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </ActionSheet>
                    <DatePicker
                        mode='date'
                        modal
                        open={open}
                        date={new Date()}
                        onConfirm={(created_at) => {
                            dispatch(setTransactionDate(formatDate(created_at)));
                            setOpen(false)
                            actionSheetRef.current?.setModalVisible(false)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
                        <NoOutlinedMediumTextIconInput
                            field='wallet'
                            placeholder='Select wallet'
                            value={wallet.wallet_name} />
                    </TouchableOpacity>
                </View>
                {
                    type == 'Income'
                    &&
                    <View
                        style={{
                            backgroundColor: 'white',
                            marginTop: 8,
                            paddingHorizontal: 16,
                            paddingVertical: 2,
                        }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Select Tax")}>
                            <NoOutlinedMediumTextIconInput
                                field='tax'
                                placeholder='Tax' />
                        </TouchableOpacity>
                    </View>
                }
                {
                    category.name === 'Debt collection'
                    &&
                    <LoanInformation />
                }
                {
                    category.name === 'Repayment'
                    &&
                    <DebtInformation />
                }
                <View style={styles.form}>
                    <MediumTextIconInput field='people' placeholder='People' />
                    <NoOutlinedMediumTextIconInput field='reminder' placeholder='Reminder' />
                </View>
            </View>
            <W1Button
                title='Save'
                onPress={handleSaveTransaction}
            />
        </KeyboardAvoidingView>
    )
}

export default AddTransactionForm