import { View, StyleSheet } from 'react-native'
import React from 'react'
import NewCategoryButton from './NewCategoryButton'
import ExpenseSelectCategoryItem from './ExpenseSelectCategoryItem'
import {
    ScrollView
} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setTransactionType } from '../../transaction/services/addTransactionFormSlice'
import { setCurrentCategory } from '../services/categorySlice'
import transactionType from '../../transaction/data/transactionType'
const expenseCategory = require('../data/expenseCategory.json');

const ExpenseSelectCategoryList = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleSelectCategory = (category) => {
        dispatch(setTransactionType(transactionType.EXPENSE));
        dispatch(setCurrentCategory(category));
        navigation.navigate('Add Transaction');
    }
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <NewCategoryButton />
                {expenseCategory.map((item, index) => { 
                    return <ExpenseSelectCategoryItem
                        onSelect={() => handleSelectCategory(item)} 
                        key={index}
                        category={item} /> 
                })}
                <View style={{ height: 24 }}></View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    container: {
        flexDirection: 'column',
    },
})


export default ExpenseSelectCategoryList