import { View, Text, FlatList } from 'react-native'
import React from 'react'
import styles from '../../styles/DayTransactionGroupStyles';
import formatCurrency from '../../../../utils/formatCurrency';
import { getDate } from '../../../../utils/getDate';
import { getDayName } from '../../../../utils/getDayName';
import { getMonthYear } from '../../../../utils/getMonthYear';
import Transaction from './Transaction';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const DayTransactionsGroup = (props) => {
    const getSum = (total, item) => {
        if (item.type == 'income') {
            return total + item.amount;
        }
        else if (item.type == 'expense') {
            return total - item.amount;
        }
        else if (item.type == 'debt_loan') {
            if (item.category == 'debt' || item.category == 'debtcollection') {
                return total + item.amount;
            }
            else {
                return total - item.amount;
            }
        }
    }
    const navigation = useNavigation();
    const handleDisplayTransactionDetail = (item) => {
        if (props.nestFrom == 'Transaction')
            navigation.navigate("Transaction Detail", { transaction: item })
        else
            navigation.navigate("Limit Transaction Detail", { transaction: item })
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
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => handleDisplayTransactionDetail(item)}>
                        <Transaction item={item} />
                    </TouchableOpacity>
                }
                keyExtractor={item => item.trans_id.toString()}
            />
        </View>
    )
}

export default DayTransactionsGroup