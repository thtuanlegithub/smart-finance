import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddTransactionInputViewHeader from '../../../transaction/components/AddTransactionInputViewHeader'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import typography from '../../../../styles/typography'
import colors from '../../../../styles/colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ATimeRangeGeneralReport from '../../components/ATimeRangeGeneralReport'
import { useTranslation } from 'react-i18next'
import { getAllTransactions, getTransactionsByRange, groupTransactionsByMonth, groupTransactionsByWeek, groupTransactionsByYear } from '../../../transaction'
import { parse } from 'date-fns';
import { useSelector } from 'react-redux'

const TimeTab = createMaterialTopTabNavigator();

const GeneralReport = (props) => {
    const { t } = useTranslation(); 
    const currentWallet = useSelector(state => state.wallet.currentWallet);
    const transactionTimeRange = useSelector(state => state.transaction.transactionTimeRange);
    const transactionTimeRangeStart = useSelector(state => state.transaction.transactionTimeRangeStart);
    const transactionTimeRangeEnd = useSelector(state => state.transaction.transactionTimeRangeEnd);
    const [timeRange, setTimeRange] = useState(null);
    const [transactionTimeRanges, setTransactionTimeRanges] = useState(
        [
            {
                "timeRange": "",
                "transactions": []
            }
        ]
    );

    const fetchTransactions = async () => {
        if (!currentWallet?.wallet_id) return;
        let transactions
        if (transactionTimeRangeStart && transactionTimeRangeEnd) {
            const start = parse(transactionTimeRangeStart, 'MMMM d, yyyy', new Date());
            const end = parse(transactionTimeRangeEnd, 'MMMM d, yyyy', new Date());
            transactions = await getTransactionsByRange(currentWallet.wallet_id, start, end)
        } else {
            transactions = await getAllTransactions(currentWallet.wallet_id);
        }
        let groupedTransactions;
        switch (transactionTimeRange) {
            case 'by-month':
                groupedTransactions = groupTransactionsByMonth(transactions);
                break;
            case 'by-year':
                groupedTransactions = groupTransactionsByYear(transactions);
                break;
            default:
                groupedTransactions = groupTransactionsByWeek(transactions);
                break;
        }
        setTimeRange(groupedTransactions);
    };

    useEffect(() => {
        fetchTransactions();
    }, [currentWallet.balance, transactionTimeRangeStart, transactionTimeRangeEnd, transactionTimeRange]);

    useEffect(() => {
        if (timeRange) {
            const newTransactionTimeRanges = Object.keys(timeRange).map(timeRangeKey => ({
                timeRange: timeRangeKey,
                transactions: timeRange[timeRangeKey]
            }));
            setTransactionTimeRanges(newTransactionTimeRanges);
        }
    }, [timeRange]);

    return (
        <View style={styles.container}>
            <AddTransactionInputViewHeader
                backContent={t('close')}
                title={t('detail-report')}
                onBackPress={() => {
                    props.handleDisplayBottomSheetReport(false);
                }}
            />
            <TouchableOpacity
                style={styles.calendar}>
                <FontAwesome5 name="calendar-alt" size={24} color={colors.green07} solid />
            </TouchableOpacity>
            <TimeTab.Navigator
                screenOptions={{
                    tabBarPressColor: colors.gray02,
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: {
                        ...typography.MediumInterH5,
                        color: colors.green07,
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: colors.green07,
                    },
                    tabBarItemStyle: {
                        width: 'auto',
                    },
                    tabBarStyle: {
                        shadowColor: "#FFF",
                        borderBottomWidth: 0.3,
                        borderBottomColor: colors.gray03,
                    }
                }}>
                {
                    transactionTimeRanges.map((range, index) => (
                        <TimeTab.Screen
                            screenOptions={{
                            }}
                            key={index}
                            name={t(range.timeRange ? range.timeRange : t('pending')).toUpperCase()}
                            initialParams={{ range }}>
                            {
                                props => <ATimeRangeGeneralReport {...props} 
                                            type={props.route.name} 
                                            transactions={range.transactions}
                                            rawTransactions={transactionTimeRanges}
                                        />
                            }
                        </TimeTab.Screen>
                    ))
                }
            </TimeTab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    calendar: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 16,
    }
})

export default GeneralReport