import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../styles/TransactionStyles';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import formatCurrency from '../../../utils/formatCurrency';
import DayTransactionsGroup from './transactionitem/DayTransactionsGroup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const TransactionsList = (props) => {
    const transactionTypeFilter = useSelector(state => state.transaction.transactionTypeFilter)
    const { t } = useTranslation();
    const [transactionListFilter, setTransactionListFilter] = useState([]);
    const transactions = props.transactions || [];
    console.log(transactions);
    const getSumExpense = () => {
        return transactions.reduce((total, transaction) => {
            if (transaction.type === 'expense') {
                return total + transaction.amount;
            }
        }, 0);
    }

    const getSumIncome = () => {
        return transactions.reduce((total, transaction) => {
            if (transaction.type === 'income') {
                return total + transaction.amount;
            }
        }, 0);
    }

    const getSumDebtLoan = () => {
        return transactions.reduce((total, transaction) => {
            if (transaction.type === 'debt_loan') {
                return total + transaction.amount;
            }
        }, 0);
    }

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <View style={styles.transactionListQuickReport}>
                        {props.type
                            ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>
                                    {t(`total-${getTypeNameById[props.type].toLowerCase()}-of-this-time`)}
                                </Text>
                                {
                                    props.type == 'expense'
                                    &&
                                    <Text style={[typography.SemiBoldInterH4, { color: colors.red01 }]}>{formatCurrency(getSumExpense()) || "0"}</Text>
                                }
                                {
                                    props.type == 'income'
                                    &&
                                    <Text style={[typography.SemiBoldInterH4, { color: colors.green08 }]}>{formatCurrency(getSumIncome()) || "0"}</Text>
                                }

                                {
                                    props.type == 'debt_loan'
                                    &&
                                    <Text style={[typography.SemiBoldInterH4, { color: colors.green08 }]}>{formatCurrency(getSumDebtLoan()) || "0"}</Text>
                                }
                            </View>
                            :
                            <View style={{ flexDirection: 'column', gap: 4 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>{t('total-expense-of-this-time')}</Text>
                                    <Text style={[typography.SemiBoldInterH4, { color: colors.red01 }]}>{formatCurrency(getSumExpense()) || "0"}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>{t('total-income-of-this-time')}</Text>
                                    <Text style={[typography.SemiBoldInterH4, { color: colors.green08 }]}>{formatCurrency(getSumIncome()) || "0"}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>{t('total-debt-loan-of-this-time')}</Text>
                                    <Text style={[typography.SemiBoldInterH4, { color: colors.green08 }]}>{formatCurrency(getSumDebtLoan()) || "0"}</Text>
                                </View>
                            </View>
                        }
                    </View>
                }
                    data={transactions}
                    renderItem={({ item }) => <DayTransactionsGroup
                    nestFrom='Transaction' {...item} 
                    transactions={transactions}    
                />}
                keyExtractor={item => item.trans_id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default TransactionsList