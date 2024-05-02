import { View, Text, FlatList } from 'react-native'
import React from 'react'
import styles from '../../styles/DayTransactionGroupStyles';
import formatCurrency from '../../../../utils/formatCurrency';
import { getDate } from '../../../../utils/getDate';
import { getDayName } from '../../../../utils/getDayName';
import { getMonthYear } from '../../../../utils/getMonthYear';
import Transaction from './Transaction';
const DayTransactionsGroup = (props) => {
    const getSum = (total, item) => {
        if (item.type == 'Income') {
            return total + item.amount;
        }
        else if (item.type == 'Expense') {
            return total - item.amount;
        }
        else if (item.type == 'Debt/ Loan') {
            if (item.category == 'Debt' || item.category == 'Debt collection') {
                return total + item.amount;
            }
            else {
                return total - item.amount;
            }
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.dateText}>{getDate(props.date)}</Text>
                <View style={styles.rightHeader}>
                    <View>
                        <Text style={styles.dayText}>{getDayName(props.date)}</Text>
                        <Text style={styles.monthYearText}>{getMonthYear(props.date)}</Text>
                    </View>
                    {
                        props.transactions.reduce(getSum, 0) == 0
                        &&
                        <Text style={{ ...styles.totalMoneyOfDay, color: colors.blue05 }}>0</Text>
                    }
                    {
                        props.transactions.reduce(getSum, 0) > 0
                        &&
                        <Text style={styles.totalMoneyOfDay}>+{formatCurrency(props.transactions.reduce(getSum, 0))}</Text>
                    }
                    {
                        props.transactions.reduce(getSum, 0) < 0
                        &&
                        <Text style={{
                            ...styles.totalMoneyOfDay,
                            color: colors.red01
                        }}>{formatCurrency(props.transactions.reduce(getSum, 0))}</Text>
                    }
                </View>
            </View>
            <FlatList
                gap={10}
                data={props.transactions}
                renderItem={({ item }) => <Transaction item={item} />}
                keyExtractor={item => item.id}
            />
        </View >
    )
}

export default DayTransactionsGroup