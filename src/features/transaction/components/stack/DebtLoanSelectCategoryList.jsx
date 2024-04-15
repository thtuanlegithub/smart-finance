import { View, StyleSheet } from 'react-native'
import React from 'react'
import NewCategoryButton from '../NewCategoryButton'
import debtLoanCategoryIcons from '../../../../data/debtLoanCategoryIcons'
import DebtLoanSelectCategoryItem from '../DebtLoanSelectCategoryItem'
import {
    ScrollView
} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setTransactionCategory, setTransactionType } from '../../services/addTransactionFormSlice'
const DebtLoanSelectCategoryList = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleSelectCategory = (category) => {
        dispatch(setTransactionType('Debt/ Loan'));
        dispatch(setTransactionCategory(category));
        navigation.navigate('Add Transaction');
    }
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                {Object.entries(debtLoanCategoryIcons).map(([key, value], index) => {
                    return <DebtLoanSelectCategoryItem
                        onSelect={() => handleSelectCategory(key)}
                        key={index}
                        category={key} />
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