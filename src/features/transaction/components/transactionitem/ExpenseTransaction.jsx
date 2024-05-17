import { View, Image, Text } from 'react-native'
import React from 'react'
import globalStyles from '../../../../styles/globalStyles'
import styles from '../../styles/TransactionItem';
import formatCurrency from '../../../../utils/formatCurrency';
import expenseCategoryIcons from '../../../../data/expenseCategoryIcons';
import getCategoryNameById from '../../../../utils/getCategoryNameById';
import { getCategoryIcons } from '../../../category';
import { useTranslation } from 'react-i18next';
const ExpenseTransaction = ({ item }) => {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Image style={globalStyles.transactionIcon}
                source={getCategoryIcons(item.category_id)} />
            <View style={styles.transactionInformation}>
                <View style={styles.detailInformation}>
                    <Text style={styles.transactionType}>{t(item.type)}</Text>
                    <Text style={styles.transactionNote}>{item.note}</Text>
                </View>
                <Text style={styles.transactionAmount}>{formatCurrency(item.amount)}</Text>
            </View>
        </View>
    )
}

export default ExpenseTransaction