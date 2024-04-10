import { View, Text, FlatList } from 'react-native'
import React from 'react'
import styles from '../styles/DayTransactionGroupStyles';
import formatCurrency from '../../../utils/formatCurrency';
import SpendingTransaction from './SpendingTransaction';
const DayTransactionsGroup = () => {
    const listTransaction = [
        {
            id: '1',
            category: 'Food & Beverage',
            note: 'Tiền ăn cả ngày',
            amount: 100000
        },
        {
            id: '2',
            category: 'Shopping',
            note: 'Mua sắm đồ dùng cá nhân',
            amount: 50000
        },
        {
            id: '3',
            category: 'Transportation',
            note: 'Đổ xăng',
            amount: 50000
        }
    ];
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.dateText}>19</Text>
                <View style={styles.rightHeader}>
                    <View>
                        <Text style={styles.dayText}>Tuesday</Text>
                        <Text style={styles.monthYearText}>March 2024</Text>
                    </View>
                    <Text style={styles.totalMoneyOfDay}>{formatCurrency(-200000)}</Text>
                </View>
            </View>
            <FlatList
                gap={10}
                data={listTransaction}
                renderItem={({ item }) => <SpendingTransaction item={item} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default DayTransactionsGroup