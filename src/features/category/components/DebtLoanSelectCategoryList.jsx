import { View, StyleSheet } from 'react-native'
import React from 'react'
import NewCategoryButton from './NewCategoryButton'
import DebtLoanSelectCategoryItem from './DebtLoanSelectCategoryItem'
import {
    ScrollView
} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setTransactionType } from '../../transaction/services/addTransactionFormSlice'
import { setCurrentCategory } from '../services/categorySlice'
const debtLoanCategory = require('../data/debtLoanCategory.json');

const DebtLoanSelectCategoryList = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    const handleSelectCategory = (category) => {
        dispatch(setTransactionType('Debt/ Loan'));
        dispatch(setCurrentCategory(category));
        navigation.navigate('Add Transaction');
    }
    
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                {debtLoanCategory.map((item, index) => { 
                    return <DebtLoanSelectCategoryItem
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
        marginTop: 14,
        flex: 1,
    },
    container: {
        flexDirection: 'column',
    },
})


export default DebtLoanSelectCategoryList