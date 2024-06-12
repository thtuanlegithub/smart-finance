import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'
import formatCurrency from '../../../utils/formatCurrency'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import SpendingCategoryReport from '../../../components/SpendingCategoryReport'
import styles from '../HomeStyles'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getAllTransactionsInWeek, getTop3Expense, getTotalExpense } from '../../transaction'
const WeekReport = () => {
    const { t } = useTranslation();
    const [spendingMoney, setSpendingMoney] = useState(0);
    const [top3Expense, setTop3Expense] = useState([]);
    const currentWallet = useSelector(state => state.wallet.currentWallet);
    const fetchTransactions = async () => {
        if (currentWallet && currentWallet.wallet_id) {
            const transactionsInWeek = await getAllTransactionsInWeek(currentWallet.wallet_id);
            const top3Expense = getTop3Expense(transactionsInWeek);
            const totalExpenseInWeek = getTotalExpense(transactionsInWeek);
            setSpendingMoney(totalExpenseInWeek);
            setTop3Expense(top3Expense);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [currentWallet.balance]);
    
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 4 }}>
            {
                top3Expense.length > 0 ? (
                <>                        
                    <View>
                        <Text style={[typography.BoldInterH3, { color: colors.green07 }]}>{formatCurrency(spendingMoney)} VND</Text>
                        <View style={styles.summaryGroup}>
                            <Text style={[typography.RegularInterH5]}>{t('total-spend-of-this-week')}</Text>
                            {/* <View style={styles.changeReport}>
                                <View style={styles.changeIcon}>
                                    <FontAwesome5 name="arrow-up" size={11} color={colors.red03} />
                                </View>
                                <Text style={[typography.MediumInterH5, { color: colors.red03 }]}> 15%</Text>
                            </View> */}
                        </View>
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>Top spending</Text>
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

export default WeekReport