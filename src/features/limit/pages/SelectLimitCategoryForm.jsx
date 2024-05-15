import { View, Text } from 'react-native'
import React from 'react'
import StackHeader from '../../../components/StackHeader'
import { useTranslation } from 'react-i18next'
import ExpenseSelectCategoryList from '../../category/components/ExpenseSelectCategoryList'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setCurrentCategory } from '../../category/services/categorySlice'
import { setTransactionCategory } from '../../transaction'

const SelectLimitCategoryForm = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleCategorySelect = (category) => {
        navigation.goBack();
        dispatch(setTransactionCategory(category.id));
    }
    return (
        <View style={{ flex: 1 }}>
            <StackHeader
                title={t('select-limit-category')}
            />
            <ExpenseSelectCategoryList onCategorySelect={handleCategorySelect} />
        </View>
    )
}

export default SelectLimitCategoryForm