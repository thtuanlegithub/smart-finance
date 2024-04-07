import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import formatCurrency from '../../../utils/formatCurrency';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from '../HomeStyles';
import LabelSwitchButton from '../../../components/LabelSwitchButton';
import SpendingCategoryReport from '../../../components/SpendingCategoryReport';
import SavingItem from '../../../components/SavingItem';
import LimitItem from '../../../components/LimitItem';
function Home(props) {
    const [balances, setBalances] = useState(15000000);
    const [spendingMoney, setSpendingMoney] = useState(785000);
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
                        <LabelSwitchButton />
                        <View>
                            <Text style={[typography.BoldInterH3, { color: colors.green07 }]}>{formatCurrency(spendingMoney)} VND</Text>
                            <View style={styles.summaryGroup}>
                                <Text style={[typography.RegularInterH5]}>Total spend of this week</Text>
                                <View style={styles.changeReport}>
                                    <View style={styles.changeIcon}>
                                        <FontAwesome5 name="arrow-down" size={11} color={colors.green06} />
                                    </View>
                                    <Text style={[typography.MediumInterH5, { color: colors.green07 }]}> 15%</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>Top spending</Text>
                            <SpendingCategoryReport category="Food & Beverage" amount={800000} percentage={50} />
                            <SpendingCategoryReport category="Food & Beverage" amount={800000} percentage={50} />
                            <SpendingCategoryReport category="Food & Beverage" amount={800000} percentage={50} />
                        </View>
                    </View>
                </View>
                <View style={styles.targetProgress}>
                    <View style={styles.targetProgressReportHeader}>
                        <Text style={[typography.MediumInterH4, { color: colors.green08, paddingVertical: 8 }]}>Target Progress</Text>
                        <TouchableOpacity>
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