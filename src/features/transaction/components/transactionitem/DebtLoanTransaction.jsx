import { View, Image, Text } from 'react-native'
import React from 'react'
import globalStyles from '../../../../styles/globalStyles'
import styles from '../../styles/TransactionItem';
import formatCurrency from '../../../../utils/formatCurrency';
import colors from '../../../../styles/colors';
import transactionCategoryIcons from '../../../../data/transactionCategoryIcons';
const DebtLoanTransaction = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image style={globalStyles.transactionIcon} source={transactionCategoryIcons[item.category]} />
            <View style={styles.transactionInformation}>
                <View style={styles.detailInformation}>
                    <Text style={styles.transactionType}>{item.category}</Text>
                    <Text style={styles.transactionNote}>{item.note}</Text>
                </View>
                {
                    (item.category == 'Debt' || item.category == 'Debt collection')
                    &&
                    <Text style={{
                        ...styles.transactionAmount,
                        color: colors.green08,
                    }}>{formatCurrency(item.amount)}</Text>
                }
                {
                    (item.category == 'Loan' || item.category == 'Repayment')
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