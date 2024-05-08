import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useRef, useState } from 'react'
import typography from '../../../../../styles/typography'
import colors from '../../../../../styles/colors'
import { ScrollView } from 'react-native-gesture-handler'
import MoneyInput from '../../../../../components/MoneyInput'
import MediumTextIconInput from '../../../components/MediumTextIconInput'
import formatCurrency from '../../../../../utils/formatCurrency'
import calculatePersonalIncomeTax from '../../../../../utils/calculatePersonalIncomeTax'
import ActionSheet from 'react-native-actions-sheet'
import { useDispatch, useSelector } from 'react-redux'
import SelectCategoryInput from '../../../components/SelectCategoryInput'
import BottomMenuItem from '../../../../../components/BottomMenuItem'
import DatePicker from 'react-native-date-picker'
import { setUpdateTransactionAmount, setUpdateTransactionCategory, setUpdateTransactionDate, setUpdateTransactionDependents, setUpdateTransactionHasTax, setUpdateTransactionInsurance, setUpdateTransactionNote, setUpdateTransactionPeople, setUpdateTransactionReference, setUpdateTransactionReminderDate, setUpdateTransactionType } from '../../../services/updateTransactionFormSlice'
import NoOutlinedMediumTextIconInput from '../../../components/NoOutlinedMediumTextIconInput'
import W1Button from '../../../../../components/W1Button'
import { useNavigation } from '@react-navigation/native'
import { formatDate } from '../../../../../utils/formatDate'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DebtInformation from '../../../../category/components/DebtInformation'
import LoanInformation from '../../../../category/components/LoanInformation'

const TODAY = 0;
const YESTERDAY = 1;
const CUSTOM = 2;


const UpdateTransactionForm = (props) => {
    const actionSheetRef = useRef();

    const [datePickerOpen, setDatePickerOpen] = useState(false);
    // redux selector
    const dispatch = useDispatch();
    const note = useSelector(state => state.updateTransactionForm.note);
    const created_at = useSelector(state => state.updateTransactionForm.created_at);
    const amount = useSelector(state => state.updateTransactionForm.amount);
    const wallet = useSelector(state => state.updateTransactionForm.wallet);
    const categoryId = useSelector(state => state.updateTransactionForm.category_id);
    const type = useSelector(state => state.updateTransactionForm.type);
    const currentWallet = useSelector(state => state.wallet.currentWallet);
    const hasReminder = useSelector(state => state.updateTransactionForm.hasReminder);
    const reminderTime = useSelector(state => state.updateTransactionForm.reminderTime);
    const reminderDate = useSelector(state => state.updateTransactionForm.reminderDate);
    const people = useSelector(state => state.updateTransactionForm.people);
    const hasTax = useSelector(state => state.updateTransactionForm.hasTax);
    const insurance = useSelector(state => state.updateTransactionForm.insurance);
    const dependents = useSelector(state => state.updateTransactionForm.dependents);


    const navigation = useNavigation();
    const handleAmountChange = (amount) => {
        amount = parseInt(amount);
        dispatch(setUpdateTransactionAmount(amount));
    }

    // Handle Select Transaction Date
    const handleSelectTransactionDay = (index) => {
        if (index === TODAY) {
            dispatch(setUpdateTransactionDate(formatDate(new Date())));
            actionSheetRef.current?.setModalVisible(false)
        } else if (index === YESTERDAY) {
            let yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            dispatch(setUpdateTransactionDate(formatDate(yesterday)));
            actionSheetRef.current?.setModalVisible(false)
        } else if (index === CUSTOM) {
            setDatePickerOpen(true)
        }
    }

    const handleSaveTransaction = () => {

    }

    return (
        <KeyboardAvoidingView
            style={styles.container}>
            <ScrollView style={{ marginBottom: 60 }}>
                <Text style={styles.title}>Edit Transaction</Text>
                <View style={styles.form}>
                    <View style={{ marginTop: 8 }}>
                        <MoneyInput
                            onChange={(amount) => handleAmountChange(amount)}
                            value={amount} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Select Category")}>
                        <SelectCategoryInput
                            feature='updatetransaction' />
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
                                        placeholder='No tax' />
                            }
                        </TouchableOpacity>
                    }
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
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36, }}>
                            <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>Select a day</Text>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity
                                    onPress={() => handleSelectTransactionDay(TODAY)}
                                    style={styles.bottomMenuItemContainer}>
                                    <BottomMenuItem title='Today' />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity
                                    onPress={() => handleSelectTransactionDay(YESTERDAY)}
                                    style={styles.bottomMenuItemContainer}>
                                    <BottomMenuItem title='Yesterday' />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity onPress={() => handleSelectTransactionDay(CUSTOM)} style={styles.bottomMenuItemContainer}>
                                    <BottomMenuItem title='Custom' />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => actionSheetRef.current?.setModalVisible(false)} style={styles.bottomMenuItemContainer}>
                                <Text style={[typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </ActionSheet>
                    <DatePicker
                        mode='date'
                        modal
                        open={datePickerOpen}
                        date={new Date()}
                        onConfirm={(created_at) => {
                            dispatch(setUpdateTransactionDate(formatDate(created_at)));
                            setDatePickerOpen(false)
                            actionSheetRef.current?.setModalVisible(false)
                        }}
                        onCancel={() => {
                            setDatePickerOpen(false)
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
                                <MediumTextIconInput field='people' placeholder='People' />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Reminder")}>
                        {
                            hasReminder
                                ?
                                <NoOutlinedMediumTextIconInput field='reminder' value={reminderTime + ", " + reminderDate} />
                                :
                                <NoOutlinedMediumTextIconInput field='reminder' placeholder='No Reminder' />
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
                    title='Save'
                    onPress={handleSaveTransaction}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItem: 'center',
        backgroundColor: colors.gray02,
        justifyContent: 'space-between',
        paddingBottom: 24,
    },
    title: {
        backgroundColor: 'white',
        ...typography.MediumInterH4,
        color: 'black',
        textAlign: 'center',
        padding: 14,
    },
    form: {
        marginTop: 10,
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    bottomMenuItemContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default UpdateTransactionForm