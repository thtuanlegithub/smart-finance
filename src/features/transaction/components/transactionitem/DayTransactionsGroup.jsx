import { View, Text, FlatList } from 'react-native'
import React from 'react'
import styles from '../../styles/DayTransactionGroupStyles';
import formatCurrency from '../../../../utils/formatCurrency';
import Transaction from './Transaction';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setUpdateTransactionReference } from '../../services/updateTransactionFormSlice';
import { format, parse } from 'date-fns';

const DayTransactionsGroup = (props) => {
    const { t } = useTranslation();
    const transactions = props.transactions || [];
    // Parse the date string into a Date object
    const date = parse(props.date, 'MMMM d, yyyy', new Date());
    const month = format(date, 'MMMM');
    const day = format(date, 'd');
    const year = format(date, 'yyyy');
    const dayOfWeek = format(date, 'EEEE');

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
    const dispatch = useDispatch();
    const handleDisplayTransactionDetail = (item) => {
        if (props.nestFrom == 'Transaction') {
            dispatch(setUpdateTransactionReference(item));
            console.log(item);
            navigation.navigate("Transaction Detail", { transaction: item })
        }
        else
            navigation.navigate("Limit Transaction Detail", { transaction: item })
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.dateText}>{day}</Text>
                <View style={styles.rightHeader}>
                    <View>
                        <Text style={styles.dayText}>{t(dayOfWeek.toLowerCase())}</Text>
                        <View style={{ flexDirection: 'row', gap: 2 }}>
                            <Text style={styles.monthYearText}>{t(month.toLowerCase())},</Text>
                            <Text style={styles.monthYearText}>{year}</Text>
                        </View>
                    </View>
                    {
                        transactions.reduce(getSum, 0) == 0
                        &&
                        <Text style={{ ...styles.totalMoneyOfDay, color: colors.blue05 }}>0</Text>
                    }
                    {
                        transactions.reduce(getSum, 0) > 0
                        &&
                        <Text style={styles.totalMoneyOfDay}>+{formatCurrency(transactions.reduce(getSum, 0))}</Text>
                    }
                    {
                        transactions.reduce(getSum, 0) < 0
                        &&
                        <Text style={{
                            ...styles.totalMoneyOfDay,
                            color: colors.red01
                        }}>{formatCurrency(transactions.reduce(getSum, 0))}</Text>
                    }
                </View>
            </View>
            <FlatList
                gap={10}
                data={transactions}
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