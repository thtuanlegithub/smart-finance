import { View, Text, KeyboardAvoidingView } from 'react-native'
import React, { useState, useRef } from 'react'
import styles from '../../styles/AddTransactionFormStyles'
import MoneyInput from '../../../../components/MoneyInput'
import SelectCategoryInput from '../SelectCategoryInput'
import MediumTextIconInput from '../MediumTextIconInput'
import NoOutlinedMediumTextIconInput from '../NoOutlinedMediumTextIconInput'
import W1Button from '../../../../components/W1Button'
import DatePicker from 'react-native-date-picker'
import ActionSheet from 'react-native-actions-sheet'
import typography from '../../../../styles/typography'
import colors from '../../../../styles/colors'
import BottomMenuItem from '../../../../components/BottomMenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { clearInput, setDisplayModal, setTransactionAmount, setTransactionDate } from '../../services/addTransactionFormSlice'
import { formatDate } from '../../../../utils/formatDate'
import LoanInformation from '../../../category/components/LoanInformation'
import DebtInformation from '../../../category/components/DebtInformation'
import { TouchableOpacity } from 'react-native-gesture-handler'
const TODAY = 0;
const YESTERDAY = 1;
const CUSTOM = 2;

const AddTransactionForm = ({ navigation }) => {

    // Handle Action Sheet - Bottom Menu
    const [open, setOpen] = useState(false)
    const actionSheetRef = useRef(null)

    // redux selector
    const note = useSelector(state => state.addTransactionForm.note);
    const date = useSelector(state => state.addTransactionForm.date);
    const amount = useSelector(state => state.addTransactionForm.amount);
    const wallet = useSelector(state => state.addTransactionForm.wallet);
    const category = useSelector(state => state.addTransactionForm.category);

    const dispatch = useDispatch();


    // Handle Select Transaction Date
    const handlePress = (index) => {
        if (index === TODAY) {
            dispatch(setTransactionDate(formatDate(new Date())));
            actionSheetRef.current?.setModalVisible(false)
            console.log(date);
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
        dispatch(setTransactionAmount(amount));
        console.log(amount);
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
                            value={date}
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
                        onConfirm={(date) => {
                            dispatch(setTransactionDate(formatDate(date)));
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
                            value={wallet} />
                    </TouchableOpacity>
                </View>
                {
                    category == 'Debt collection'
                    &&
                    <LoanInformation />
                }
                {
                    category == 'Repayment'
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
                onPress={() => {
                    dispatch(setDisplayModal(false));
                    dispatch(clearInput());
                }}
            />
        </KeyboardAvoidingView>
    )
}

export default AddTransactionForm