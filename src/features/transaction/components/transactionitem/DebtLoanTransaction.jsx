import { View, Image, Text } from 'react-native'
import React from 'react'
import globalStyles from '../../../../styles/globalStyles'
import styles from '../../styles/TransactionItem';
import formatCurrency from '../../../../utils/formatCurrency';
import colors from '../../../../styles/colors';
import transactionCategoryIcons from '../../../../data/transactionCategoryIcons';
import getCategoryNameById from '../../../../utils/getCategoryNameById';
import { getCategoryIcons } from '../../../category';
const DebtLoanTransaction = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image style={globalStyles.transactionIcon}
                source={getCategoryIcons(item.category)} />
            <View style={styles.transactionInformation}>
                <View style={styles.detailInformation}>
                    <Text style={styles.transactionType}>{getCategoryNameById(item.category)}</Text>
                    <Text style={styles.transactionNote}>{item.note}</Text>
                </View>
                {
                    (item.category == 'debt' || item.category == 'debtcollection')
                    &&
                    <Text style={{
                        ...styles.transactionAmount,
                        color: colors.green08,
                    }}>{formatCurrency(item.amount)}</Text>
                }
                {
                    (item.category == 'loan' || item.category == 'repayment')
                    &&
                    <Text style={{
                        ...styles.transactionAmount,
                        color: colors.red01,
                    }}>{formatCurrency(item.amount)}</Text>
                }
            </View>
        </View>
    )
}

export default DebtLoanTransaction