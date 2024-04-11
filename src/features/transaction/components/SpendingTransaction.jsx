import { View, Image, Text } from 'react-native'
import React from 'react'
import globalStyles from '../../../styles/globalStyles'
import styles from '../styles/TransactionItem';
import formatCurrency from '../../../utils/formatCurrency';
import categoryIcons from '../../../data/categoryIcons';
const SpendingTransaction = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image style={globalStyles.transactionIcon} source={categoryIcons[item.category]} />
            <View style={styles.transactionInfomation}>
                <View style={styles.detailInformation}>
                    <Text style={styles.transactionType}>{item.category}</Text>
                    <Text style={styles.transactionNote}>{item.note}</Text>
                </View>
                <Text style={styles.transactionAmount}>{formatCurrency(item.amount)}</Text>
            </View>
        </View>
    )
}

export default SpendingTransaction