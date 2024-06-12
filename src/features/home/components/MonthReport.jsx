import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'
import formatCurrency from '../../../utils/formatCurrency'
import SpendingCategoryReport from '../../../components/SpendingCategoryReport'
import styles from '../HomeStyles'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getAllTransactionsInMonth, getTop3Expense, getTotalExpense } from '../../transaction'
const MonthReport = () => {
    const { t } = useTranslation();
    const [spendingMoney, setSpendingMoney] = useState(0);
    const [top3Expense, setTop3Expense] = useState([]);
    const currentWallet = useSelector(state => state.wallet.currentWallet);
    const fetchTransactions = async () => {
        if (currentWallet && currentWallet.wallet_id) {
            const transactionsInMonth = await getAllTransactionsInMonth(currentWallet.wallet_id);
            const top3Expense = getTop3Expense(transactionsInMonth);
            const totalExpenseInMonth = getTotalExpense(transactionsInMonth);
            setSpendingMoney(totalExpenseInMonth);
            setTop3Expense(top3Expense);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [currentWallet.balance]);

    return (
        <View style={styles.spendingReportCardContainer}>
            {
                top3Expense.length > 0 ? (
                    <>
                        <View>
                            <Text style={[typography.BoldInterH3, { color: colors.green07 }]}>{formatCurrency(spendingMoney)} VND</Text>
                            <View style={styles.summaryGroup}>
                                <Text style={[typography.RegularInterH5]}>{t('total-spend-of-this-month')}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 16 }}>
                            <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>{t('top-spending')}</Text>
                            {top3Expense.map((transaction, index) => (
                                <SpendingCategoryReport
                                    key={index}
                                    category={transaction.category_id}
                                    amount={transaction.amount}
                                    percentage={transaction.percentage}
                                />
                            ))}
                        </View>
                    </>
                )
                    :
                    <Text style={[typography.RegularInterH5, { color: colors.green07 }]}>{t('no-data')}</Text>
            }
        </View>
    )
}

export default MonthReport