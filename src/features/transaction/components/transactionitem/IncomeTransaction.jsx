import { View, Image, Text } from 'react-native'
import React from 'react'
import globalStyles from '../../../../styles/globalStyles'
import styles from '../../styles/TransactionItem';
import formatCurrency from '../../../../utils/formatCurrency';
import incomeCategoryIcons from '../../../../data/incomeCategoryIcons';
import colors from '../../../../styles/colors';
import { getCategoryIcons } from '../../../category';
import getCategoryNameById from '../../../../utils/getCategoryNameById';
const IncomeTransaction = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image style={globalStyles.transactionIcon} source={getCategoryIcons(item.category)} />
            <View style={styles.transactionInformation}>
                <View style={styles.detailInformation}>
                    <Text style={styles.transactionType}>{getCategoryNameById(item.category)}</Text>
                    <Text style={styles.transactionNote}>{item.note}</Text>
                </View>
                <Text style={{
                    ...styles.transactionAmount,
                    color: colors.green08,
                }}>{formatCurrency(item.amount)}</Text>
            </View>
        </View>
    )
}

export default IncomeTransaction