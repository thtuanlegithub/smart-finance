import React from 'react'
import { View,  StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import typography from '../../../../../styles/typography';
import colors from '../../../../../styles/colors';
import ATimeRangeExpenseReport from '../../../components/ExpenseReport/ATimeRangeExpenseReport';
import AddTransactionInputViewHeader from '../../../../transaction/components/AddTransactionInputViewHeader';

const TimeTab = createMaterialTopTabNavigator();

const ExpenseReport = (props) => {
    const navigation = useNavigation();
    const route = useRoute();
    const rawTransaction = route.params?.data || [];
    const expenseTransactions = rawTransaction.map(item => {
        const filteredTransactions = item.transactions.filter(transaction => transaction.type === 'expense');
        return { ...item, transactions: filteredTransactions };
    });

    const { t } = useTranslation();

    return (
        <View style={{ position: 'relative', flex: 1 }}>
            <AddTransactionInputViewHeader
                title={t('expense-detail')}
                onBackPress={() => {
                    navigation.goBack();
                }} />
            {/* <TouchableOpacity
                style={styles.calendar}>
                <FontAwesome5 name="calendar-alt" size={24} color={colors.green07} solid />
            </TouchableOpacity> */}
            <TimeTab.Navigator
                screenOptions={{
                    tabBarPressColor: colors.gray02,
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: {
                        ...typography.MediumInterH5,
                        color: colors.green07,
                        textTransform: 'none',
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
                    expenseTransactions.map((range, index) => (
                        <TimeTab.Screen
                            screenOptions={{
                            }}
                            key={index}
                            name={t(range.timeRange ? range.timeRange : t('pending')).toUpperCase()}
                            initialParams={{ range }}>
                            {
                                props => <ATimeRangeExpenseReport {...props} 
                                    type={props.route.name}
                                    transactions={range.transactions} />
                            }
                        </TimeTab.Screen>
                    ))
                }
            </TimeTab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    calendar: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 1
    }
})

export default ExpenseReport