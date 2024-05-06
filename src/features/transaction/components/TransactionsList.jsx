import { View, Text } from 'react-native'
import React from 'react'
import styles from '../styles/TransactionStyles';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import formatCurrency from '../../../utils/formatCurrency';
import DayTransactionsGroup from './transactionitem/DayTransactionsGroup';
import { FlatList } from 'react-native-gesture-handler';
import fakeDataTransactionList from '../../../data/fakeDataTransactionList';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const TransactionsList = (props) => {
    const transactionTypeFilter = useSelector(state => state.transaction.transactionTypeFilter)
    const { t } = useTranslation(); 
    const fakeDataTransactionListFilter = fakeDataTransactionList.map(item => {
        return {
            ...item,
            transactions: item.transactions.filter(transaction => transaction.type == transactionTypeFilter || transactionTypeFilter == null)
        };
    }).filter(item => item.transactions.length > 0);

    const getSumExpense = () => {
        return fakeDataTransactionListFilter.reduce((total, item) => {
            return total + item.transactions.reduce((total, transaction) => {
                if (transaction.type == 'Expense') {
                    return total + transaction.amount;
                }
                return total;
            }, 0);
        }, 0);
    }

    const getSumIncome = () => {
        return fakeDataTransactionListFilter.reduce((total, item) => {
            return total + item.transactions.reduce((total, transaction) => {
                if (transaction.type == 'Income') {
                    return total + transaction.amount;
                }
                return total;
            }, 0);
        }, 0);
    }

    const getSumDebtLoan = () => {
        return fakeDataTransactionListFilter.reduce((total, item) => {
            return total + item.transactions.reduce((total, transaction) => {
                if (transaction.type == 'Debt/ Loan') {
                    return total + transaction.amount;
                }
                return total;
            }, 0);
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
                                <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>Total {props.type} of this time: </Text>
                                {
                                    props.type == 'Expense'
                                    &&
                                    <Text style={[typography.SemiBoldInterH4, { color: colors.red01 }]}>{formatCurrency(getSumExpense())}</Text>
                                }
                                {
                                    props.type == 'Income'
                                    &&
                                    <Text style={[typography.SemiBoldInterH4, { color: colors.green08 }]}>{formatCurrency(getSumIncome())}</Text>
                                }

                                {
                                    props.type == 'Debt/ Loan'
                                    &&
                                    <Text style={[typography.SemiBoldInterH4, { color: colors.green08 }]}>{formatCurrency(getSumDebtLoan())}</Text>
                                }
                            </View>
                            :
                            <View style={{ flexDirection: 'column', gap: 4 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>{t('total-expense-of-this-time')}</Text>
                                    <Text style={[typography.SemiBoldInterH4, { color: colors.red01 }]}>{formatCurrency(getSumExpense())}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>{t('total-expense-of-this-time')}</Text>
                                    <Text style={[typography.SemiBoldInterH4, { color: colors.green08 }]}>{formatCurrency(getSumIncome())}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>{t('total-debt-loan-of-this-time')}</Text>
                                    <Text style={[typography.SemiBoldInterH4, { color: colors.green08 }]}>{formatCurrency(getSumDebtLoan())}</Text>
                                </View>
                            </View>

                        }
                    </View>
                }
                data={fakeDataTransactionListFilter}
                renderItem={({ item }) => <DayTransactionsGroup nestFrom='Transaction' {...item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default TransactionsList