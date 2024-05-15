import { View, Text, Image } from 'react-native'
import React from 'react'
import StackHeader from '../../../components/StackHeader'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native-gesture-handler'
import investmentCategory from '../data/investmentCategory.json'
import getInvestmentIcons from '../../../utils/getInvestmentIcons'
import SelectInvestmentCategoryItem from './SelectInvestmentCategoryItem'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setAddInvestmentCategory } from '../services/addInvestmentSlice'

const SelectInvestmentCategoryForm = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleSelectInvestmentCategory = (category) => {
        dispatch(setAddInvestmentCategory(category));
        navigation.goBack();
    }
    return (
        <View style={{ flex: 1, gap: 10 }}>
            <StackHeader
                title={t('select-investment-category')}
            />
            <FlatList
                data={investmentCategory}
                renderItem={({ item }) =>
                    <SelectInvestmentCategoryItem onSelect={() => {
                        handleSelectInvestmentCategory(item);
                    }} category={item} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default SelectInvestmentCategoryForm