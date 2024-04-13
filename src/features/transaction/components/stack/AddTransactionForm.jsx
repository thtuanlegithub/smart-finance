import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../../styles/AddTransactionFormStyles'
import MoneyInput from '../../../../components/MoneyInput'
import SelectCategoryInput from '../SelectCategoryInput'
import MediumTextIconInput from '../MediumTextIconInput'
import NoOutlinedMediumTextIconInput from '../NoOutlinedMediumTextIconInput'
import W1Button from '../../../../components/W1Button'
const AddTransactionForm = ({ navigation }) => {
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
                    <MediumTextIconInput type='note' placeholder='Note' />
                    <MediumTextIconInput type='date' placeholder='Pick a day' />
                    <NoOutlinedMediumTextIconInput type='wallet' placeholder='Select wallet' />
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