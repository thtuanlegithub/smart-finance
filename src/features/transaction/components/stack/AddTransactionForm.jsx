import { View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
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

const TODAY = 0;
const YESTERDAY = 1;
const CUSTOM = 2;

const AddTransactionForm = ({ navigation }) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const actionSheetRef = useRef()
    const handlePress = (index) => {
        if (index === TODAY) {
            /* "Today" was selected */
            setDate(new Date())
        } else if (index === YESTERDAY) {
            /* "Yesterday" was selected */
            let yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            setDate(yesterday)
        } else if (index === CUSTOM) {
            /* "Custom" was selected */
            setOpen(true)
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}>
            <View>
                <Text style={styles.title}>Add Transaction</Text>
                <View style={styles.form}>
                    <View style={{ marginTop: 8 }}>
                        <MoneyInput />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Select Category")}>
                        <SelectCategoryInput />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Note")}>
                        <MediumTextIconInput type='note' placeholder='Note' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => actionSheetRef.current?.setModalVisible(true)}>
                        <MediumTextIconInput type='date' placeholder='Pick a day' />
                    </TouchableOpacity>
                    <ActionSheet ref={actionSheetRef}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                            <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>Select a day</Text>
                            <TouchableOpacity onPress={() => handlePress(TODAY)} style={styles.bottomMenuItemContainer}>
                                <BottomMenuItem title='Today' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handlePress(YESTERDAY)} style={styles.bottomMenuItemContainer}>
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
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
                        <NoOutlinedMediumTextIconInput type='wallet' placeholder='Select wallet' />
                    </TouchableOpacity>
                </View>
                <View style={styles.form}>
                    <MediumTextIconInput type='people' placeholder='People' />
                    <NoOutlinedMediumTextIconInput type='reminder' placeholder='Reminder' />
                </View>
            </View>
            <W1Button title='Save' />
        </KeyboardAvoidingView>
    )
}

export default AddTransactionForm