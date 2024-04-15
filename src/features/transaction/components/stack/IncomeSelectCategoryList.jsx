import { View, StyleSheet } from 'react-native'
import React from 'react'
import NewCategoryButton from '../NewCategoryButton'
import incomeCategoryIcons from '../../../../data/incomeCategoryIcons'
import IncomeSelectCategoryItem from '../IncomeSelectCategoryItem'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setTransactionCategory, setTransactionType } from '../../services/addTransactionFormSlice'

const IncomeSelectCategoryList = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleSelectCategory = (category) => {
        dispatch(setTransactionType('Income'));
        dispatch(setTransactionCategory(category));
        navigation.navigate('Add Transaction');
    }
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <NewCategoryButton />
                {Object.entries(incomeCategoryIcons).map(([key, value], index) => {
                    return <IncomeSelectCategoryItem
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
        flex: 1,
    },
    container: {
        flexDirection: 'column',
    },
})

export default IncomeSelectCategoryList