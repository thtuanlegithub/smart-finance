import { View, StyleSheet } from 'react-native'
import React from 'react'
import NewCategoryButton from './NewCategoryButton'
import IncomeSelectCategoryItem from './IncomeSelectCategoryItem'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setTransactionType } from '../../transaction/services/addTransactionFormSlice'
import { setCurrentCategory } from '../services/categorySlice'
const incomeCategory = require('../data/incomeCategory.json');

const IncomeSelectCategoryList = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleSelectCategory = (category) => {
        dispatch(setTransactionType('Income'));
        dispatch(setCurrentCategory(category));
        navigation.navigate('Add Transaction');
    }
    
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <NewCategoryButton />
                {incomeCategory.map((item, index) => { 
                    return <IncomeSelectCategoryItem
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

export default IncomeSelectCategoryList