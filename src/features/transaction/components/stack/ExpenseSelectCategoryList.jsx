import { View, StyleSheet } from 'react-native'
import React from 'react'
import NewCategoryButton from '../NewCategoryButton'
import expenseCategoryIcons from '../../../../data/expenseCategoryIcons'
import ExpenseSelectCategoryItem from '../ExpenseSelectCategoryItem'
import {
    ScrollView
} from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { setTransactionCategory, setTransactionType } from '../../services/addTransactionFormSlice'
import { useNavigation } from '@react-navigation/native'
const ExpenseSelectCategoryList = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleSelectCategory = (category) => {
        dispatch(setTransactionType('Expense'));
        dispatch(setTransactionCategory(category));
        navigation.navigate('Add Transaction');
    }
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <NewCategoryButton />
                {Object.entries(expenseCategoryIcons).map(([key, value], index) => {
                    return <ExpenseSelectCategoryItem
                        key={index}
                        category={key}
                        onSelect={() => handleSelectCategory(key)} />
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