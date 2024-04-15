import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles/TransactionStyles';
import WalletSelect from '../../../components/WalletSelect';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import formatCurrency from '../../../utils/formatCurrency';
import TransactionSelect from '../../../components/TransactionSelect';
import globalStyles from '../../../styles/globalStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TransactionList from '../components/TransactionsList';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

function Transaction(props) {
    const selectedTransactionType = 'expense';
    const timeRanges = ['25/3/2024 - 31/3/2024', '1/4/2024 - 7/4/2024', 'Last week', 'This week']
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.walletGroup}>
                    <WalletSelect />
                    <View style={styles.balancesGroup}>
                        <Text style={[typography.RegularInterH5, { color: colors.green07, textAlign: 'right' }]}>Balances</Text>
                        <Text style={[typography.SemiBoldInterH5, {
                            color: colors.green07
                        }]}>{formatCurrency(15000000)} VND</Text>
                    </View>
                </View>
                <View style={styles.typeOfTransaction}>
                    <View style={globalStyles.centerAlign}>
                        <TouchableOpacity>
                            <TransactionSelect selected={selectedTransactionType} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.calendar}>
                        <FontAwesome5 name="calendar-alt" size={24} color={colors.green07} solid />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.timeRangeContainer}>
                <Tab.Navigator
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
                    {timeRanges.map((range, index) => (
                        <Tab.Screen
                            key={index}
                            name={range}
                            initialParams={{ range }}>
                            {
                                props => <TransactionList {...props} type={selectedTransactionType} />
                            }
                        </Tab.Screen>
                    ))}
                </Tab.Navigator>
            </View>
        </View >
    );
}

export default Transaction;