import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import formatCurrency from '../../../utils/formatCurrency';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from '../HomeStyles';
import SavingItem from '../../../components/SavingItem';
import LimitItem from '../../../components/LimitItem';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WeekReport from '../components/WeekReport';
import MonthReport from '../components/MonthReport';
import { useNavigation } from '@react-navigation/native';

const SpendingReportTab = createMaterialTopTabNavigator();

function Home(props) {
    const [balances, setBalances] = useState(15000000);
    const navigation = useNavigation();
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={[typography.SemiBoldInterH2, styles.balancesAmount]}>{formatCurrency(balances)}</Text>
                        <Text style={[typography.RegularInterH4, styles.totalBalancesLabel]}>Total balances</Text>
                    </View>
                    <View style={styles.notificationContainer}>
                        <FontAwesome5 name="bell" size={24} color={colors.green07} solid />
                    </View>
                </View>
                <View style={styles.wallet}>
                    <View style={styles.walletHeader}>
                        <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>My wallet</Text>
                        <TouchableOpacity>
                            <Text style={[typography.SemiBoldInterH4, { color: colors.green06 }]}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.border}></View>
                    <TouchableOpacity>
                        <View style={styles.currentWallet}>
                            <View style={styles.currentWalletName}>
                                <Image style={styles.currentWalletIcon} source={require('../../../assets/images/wallet.png')} />
                                <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>Current wallet</Text>
                            </View>
                            <Text style={[typography.SemiBoldInterH4, { color: colors.green07 }]}>{formatCurrency(balances)}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.spendingReport}>
                    <View style={styles.spendingReportHeader}>
                        <Text style={[typography.MediumInterH4, { color: colors.green08, paddingVertical: 8 }]}>Spending Report</Text>
                        <TouchableOpacity>
                            <Text style={[typography.SemiBoldInterH4, { color: colors.green06, paddingVertical: 8 },]}>Detail reports</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.spendingReportCard}>
                        <SpendingReportTab.Navigator
                            screenOptions={{
                                animationEnabled: true,
                                tabBarPressColor: colors.gray02,
                                tabBarIndicatorStyle: {
                                    borderRadius: 10,
                                    backgroundColor: 'white',
                                    height: '100%',
                                    borderWidth: 4,
                                    borderColor: colors.gray02,
                                },
                                tabBarStyle: {
                                    backgroundColor: colors.gray02,
                                    marginHorizontal: 16,
                                    borderRadius: 10,
                                    marginVertical: 8,
                                    elevation: 0,
                                    height: 40,
                                },
                                tabBarItemStyle: {
                                },
                                tabBarLabelStyle: {
                                    ...typography.MediumInterH5,
                                    textTransform: 'capitalize',
                                    justifyContent: 'center',
                                    marginTop: -4,
                                },
                                tabBarActiveTintColor: colors.green08,
                                tabBarInactiveTintColor: colors.gray03,
                            }}>
                            <SpendingReportTab.Screen name="Month" component={MonthReport} />
                            <SpendingReportTab.Screen name="Week" component={WeekReport} />
                        </SpendingReportTab.Navigator>
                    </View>
                </View>
                <View style={styles.targetProgress}>
                    <View style={styles.targetProgressReportHeader}>
                        <Text style={[typography.MediumInterH4, { color: colors.green08, paddingVertical: 8 }]}>Target Progress</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Budget')}>
                            <Text style={[typography.SemiBoldInterH4, { color: colors.green06, paddingVertical: 8 }]}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.targetProgressCard}>
                        <SavingItem />
                        <LimitItem />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
export default Home;