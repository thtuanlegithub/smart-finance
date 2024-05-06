import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux'
import { getCategoryIcons } from '../../category'
import getCategoryNameById from '../../../utils/getCategoryNameById'
import { useTranslation } from 'react-i18next'
const SelectCategoryInput = (props) => {
    const currentTransactionCRUDAction = useSelector(state => state.transaction.currentTransactionCRUDAction);
    if (currentTransactionCRUDAction == 'create') {
        var categoryId = useSelector(state => state.addTransactionForm.category_id);
    }
    else if (currentTransactionCRUDAction == 'update') {
        var categoryId = useSelector(state => state.updateTransactionForm.category_id);
    }
    const { t } = useTranslation();
    return (    
        <View style={styles.container}>
            <View style={styles.labelGroup}>
                {
                    categoryId ?
                        <Image style={styles.labelIcon} source={getCategoryIcons(categoryId)} />
                        :
                        <Image style={styles.labelIcon} source={getCategoryIcons(null)} />
                }
            </View>
            <View style={styles.inputGroup}>
                {categoryId && categoryId !== 'placeholdericon'
                    ?
                    <Text style={[typography.RegularInterH4, { color: colors.green08 }]}>{t(categoryId)}</Text>
                    :
                    <Text style={[typography.RegularInterH4, { color: colors.green08, opacity: 0.5 }]}>{t('select-category')}</Text>
                }
                <FontAwesome5 name="chevron-right" size={16} color={colors.green08} opacity={0.5} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    labelGroup: {
        width: 61,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputGroup: {
        flex: 1,
        borderBottomWidth: 0.5,
        borderColor: colors.green08,
        height: 52,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    labelIcon: {
        height: 30,
        width: 30,
    }
})

export default SelectCategoryInput