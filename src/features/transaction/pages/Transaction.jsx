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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TransactionList from '../components/TransactionsList';
const Tab = createMaterialTopTabNavigator();

function Transaction(props) {
    const selectedTransactionType = 'expense';
    const timeRanges = ['Today', 'Yesterday', 'This week', 'Last week', 'This month', 'Last month', 'This year', 'Last year'];
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
                        tabBarScrollEnabled: true,
                        tabBarLabelStyle: {
                            ...typography.MediumInterH4,
                            color: colors.green07
                        },
                        tabBarItemStyle: {
                            width: 100
                        },
                        tabBarIndicatorStyle: {
                            backgroundColor: colors.green07
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
                            name={`Week ${index + 1}`}
                            initialParams={{ range }}
                        >
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