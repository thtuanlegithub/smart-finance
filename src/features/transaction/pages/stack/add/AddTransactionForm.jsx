import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import styles from '../../../styles/AddTransactionFormStyles'
import MoneyInput from '../../../../../components/MoneyInput'
import SelectCategoryInput from '../../../components/SelectCategoryInput'
import MediumTextIconInput from '../../../components/MediumTextIconInput'
import NoOutlinedMediumTextIconInput from '../../../components/NoOutlinedMediumTextIconInput'
import W1Button from '../../../../../components/W1Button'
import DatePicker from 'react-native-date-picker'
import ActionSheet from 'react-native-actions-sheet'
import typography from '../../../../../styles/typography'
import colors from '../../../../../styles/colors'
import BottomMenuItem from '../../../../../components/BottomMenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { clearInput, setDisplayModal, setTransactionAmount, setTransactionCategory, setTransactionDate, updateReminder, updateTransaction } from '../../../services/addTransactionFormSlice'
import { formatDate } from '../../../../../utils/formatDate'
import LoanInformation from '../../../../category/components/LoanInformation'
import DebtInformation from '../../../../category/components/DebtInformation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TransactionBuilder } from '../../../../../patterns'
import { setBalance, setReminderNotification, updateUserWallet } from '../../../../setting'
import transactionType from '../../../data/transactionType'
import { updateWallet } from '../../../../setting'
import formatCurrency from '../../../../../utils/formatCurrency'
import calculatePersonalIncomeTax from '../../../../../utils/calculatePersonalIncomeTax'
import getCategoryNameById from '../../../../../utils/getCategoryNameById'
import { useTranslation } from 'react-i18next'
import StackHeader from '../../../../../components/StackHeader'

const TODAY = 0;
const YESTERDAY = 1;
const CUSTOM = 2;

const AddTransactionForm = ({ navigation }) => {
    const { t } = useTranslation();
    // Handle Action Sheet - Bottom Menu
    const [open, setOpen] = useState(false)
    const actionSheetRef = useRef(null)

    // redux selector
    const dispatch = useDispatch();
    const note = useSelector(state => state.addTransactionForm.note);
    const created_at = useSelector(state => state.addTransactionForm.created_at);
    const amount = useSelector(state => state.addTransactionForm.amount);
    const wallet = useSelector(state => state.addTransactionForm.wallet);
    const categoryId = useSelector(state => state.addTransactionForm.category_id);
    const type = useSelector(state => state.addTransactionForm.type);
    const currentWallet = useSelector(state => state.wallet.currentWallet);
    const hasReminder = useSelector(state => state.addTransactionForm.hasReminder);
    const reminderTime = useSelector(state => state.addTransactionForm.reminderTime);
    const reminderDate = useSelector(state => state.addTransactionForm.reminderDate);
    const people = useSelector(state => state.addTransactionForm.people);
    const hasTax = useSelector(state => state.addTransactionForm.hasTax);
    const insurance = useSelector(state => state.addTransactionForm.insurance);
    const dependents = useSelector(state => state.addTransactionForm.dependents);

    // Handle Select Transaction Date
    const handleSelectTransactionDay = (index) => {
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
        if (!created_at || !amount || !wallet || !categoryId) {
            alert('Please fill in all required fields');
            return;
        }

        dispatch(setDisplayModal(false));
        dispatch(clearInput());

        let tax = 0;
        if (hasTax) {
            tax = {
                total_tax: calculatePersonalIncomeTax(amount, dependents, insurance),
                insurance: insurance,
                dependents: dependents,
            }
        }

        // Set local notification
        let reminder = {};
        if (hasReminder) {
            const currentTimestamp = () => Math.floor(Date.now() / 1000);
            const newReminder = {
                id: currentTimestamp(),
                title: getCategoryNameById(categoryId),
                message: note,
                notify_time: reminderTime,
                date: reminderDate
            }
            reminder = {
                id: currentTimestamp(),
                time: reminderTime + ', ' + reminderDate,
            }
            setReminderNotification(newReminder);
            updateReminder(newReminder);
        }

        const newTransaction = new TransactionBuilder()
            .setAmount(amount - calculatePersonalIncomeTax(amount, dependents, insurance))
            .setCategoryId(categoryId)
            .setCreatedAt(created_at)
            .setNote(note)
            .setWalletId(wallet.wallet_id)
            .setType(type)
            .setPeople(people)
            .setReminder(reminder)
            .setTax(tax)
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
                switch (categoryId) {
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
            <ScrollView style={{ marginBottom: 60 }}>
                <StackHeader title={t('add-transaction')}
                    backContent='Close'
                    onBackPress={() => {
                        dispatch(setDisplayModal(false));
                        setTransactionCategory(null);
                        dispatch(clearInput());
                    }} />
                <View style={styles.form}>
                    <View style={{ marginTop: 8 }}>
                        <MoneyInput
                            label='amount'
                            onChange={(amount) => handleAmountChange(amount)}
                            value={amount} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Select Category")}>
                        <SelectCategoryInput feature='addtransaction' />
                    </TouchableOpacity>
                    {
                        type == 'income'
                        &&
                        <TouchableOpacity onPress={() => navigation.navigate("Calculate Tax")}>
                            {
                                hasTax
                                    ?
                                    <MediumTextIconInput
                                        field='tax'
                                        value={formatCurrency(calculatePersonalIncomeTax(amount, dependents, insurance))} />
                                    :
                                    <MediumTextIconInput
                                        field='tax'
                                        placeholder={t('no-tax')} />
                            }
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => navigation.navigate("Note")}>
                        <MediumTextIconInput value={note}
                            field='note'
                            placeholder={t('note')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => actionSheetRef.current?.setModalVisible(true)}>
                        <MediumTextIconInput
                            value={created_at}
                            field='date'
                            placeholder={t('pick-a-date')} />
                    </TouchableOpacity>
                    <ActionSheet ref={actionSheetRef}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36, }}>
                            <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>{t('select-a-day')}</Text>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity
                                    onPress={() => handleSelectTransactionDay(TODAY)}
                                    style={styles.bottomMenuItemContainer}>
                                    <BottomMenuItem title={t('today')} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity
                                    onPress={() => handleSelectTransactionDay(YESTERDAY)}
                                    style={styles.bottomMenuItemContainer}>
                                    <BottomMenuItem title={t('yesterday')} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity onPress={() => handleSelectTransactionDay(CUSTOM)} style={styles.bottomMenuItemContainer}>
                                    <BottomMenuItem title={t('customize')} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => actionSheetRef.current?.setModalVisible(false)} style={styles.bottomMenuItemContainer}>
                                <Text style={[typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>{t('cancel')}</Text>
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
                            placeholder={t('select-wallet')}
                            value={wallet.wallet_name} />
                    </TouchableOpacity>
                </View>
                {
                    categoryId === 'debtcollection'
                    &&
                    <LoanInformation />
                }
                {
                    categoryId === 'repayment'
                    &&
                    <DebtInformation />
                }
                <View style={styles.form}>
                    <TouchableOpacity onPress={() => navigation.navigate("People")}>
                        {
                            people.length > 0
                                ?
                                <MediumTextIconInput field='people' value={people.map(person => person.name).join(', ')} />
                                :
                                <MediumTextIconInput field='people' placeholder={t('contact')} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Reminder")}>
                        {
                            hasReminder
                                ?
                                <NoOutlinedMediumTextIconInput field='reminder' value={reminderTime + ", " + reminderDate} />
                                :
                                <NoOutlinedMediumTextIconInput field='reminder' placeholder={t('no-reminder')} />
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{
                position: 'absolute',
                bottom: 0,
                paddingBottom: 16,
                width: '100%',
                paddingHorizontal: 16,
                backgroundColor: '#yourColor',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: colors.gray02,
            }}>
                <W1Button
                    title={t('save')}
                    onPress={handleSaveTransaction}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export default AddTransactionForm