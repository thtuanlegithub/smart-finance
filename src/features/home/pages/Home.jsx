import React, { useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
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
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import CustomHandle from '../../../components/CustomHandle';
import AddTransactionInputViewHeader from '../../transaction/components/AddTransactionInputViewHeader';
import WalletItem from '../../../components/WalletItem';
import { useSnapPoints } from '../../../hooks/useSnapPoints';
import { useDispatch, useSelector } from 'react-redux';
import { initiateUserSetting, initiateUserWallet, popUpNotification, setReminderNotification } from '../../setting';
import { selectWallet } from '../../setting';
import BottomSheetReport from '../components/BottomSheetReport';

const SpendingReportTab = createMaterialTopTabNavigator();

const HIDE = false;
const DISPLAY = true;

function Home(props) {
    const navigation = useNavigation();
    const bottomSheetSelectWalletRef = useRef(null);
    const snapPoints = useSnapPoints();
    const currentUser = useSelector(state => state.login.user);

    const currentWallet = useSelector(state => state.wallet.currentWallet);
    const userWallet = useSelector(state => state.wallet.wallets);
    const userSetting = useSelector(state => state.setting);
    const dispatch = useDispatch();

    const handleSelectWallet = (wallet) => {
        dispatch(selectWallet(wallet.wallet_id));
        bottomSheetSelectWalletRef.current?.close();
    }

    const handleBottomSheetSelectWallet = (action) => {
        if (action == HIDE) {
            bottomSheetSelectWalletRef.current?.close();
        }
        else {
            bottomSheetSelectWalletRef.current?.present();
        }
    }

    const handleDisplayBottomSheetSelectWallet = (action) => {
        if (action == HIDE) {
            bottomSheetSelectWalletRef.current?.close();
        }
        else {
            bottomSheetSelectWalletRef.current?.present();
        }
    }

    const bottomSheetReportRef = useRef(null);

    const handleDisplayBottomSheetReport = (action) => {
        if (action == HIDE) {
            bottomSheetReportRef.current?.close();
        }
        else {
            bottomSheetReportRef.current?.present();
        }
    }

    useEffect(() => {
        initiateUserSetting(currentUser, dispatch);
        initiateUserWallet(currentUser, dispatch);
    }, [currentUser]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={[typography.SemiBoldInterH2, styles.balancesAmount]}>{formatCurrency(currentWallet.balance.toString())}</Text>
                        <Text style={[typography.RegularInterH4, styles.totalBalancesLabel]}>Total balances</Text>
                    </View>
                    <View style={styles.notificationContainer}>
                        <FontAwesome5 name="bell" size={24} color={colors.green07} solid />
                    </View>
                </View>
                <View style={styles.wallet}>
                    <View style={styles.walletHeader}>
                        <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>My wallet</Text>
                        <TouchableOpacity onPress={() => handleDisplayBottomSheetSelectWallet(DISPLAY)}>
                            <Text style={[typography.SemiBoldInterH4, { color: colors.green06 }]}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.border}></View>
                    <TouchableOpacity onPress={() => handleDisplayBottomSheetSelectWallet(DISPLAY)}>
                        <View style={styles.currentWallet}>
                            <View style={styles.currentWalletName}>
                                <Image style={styles.currentWalletIcon} source={require('../../../assets/images/wallet.png')} />
                                <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>{currentWallet.wallet_name}</Text>
                            </View>
                            <Text style={[typography.SemiBoldInterH4, { color: colors.green07 }]}>{formatCurrency(currentWallet.amount)}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.spendingReport}>
                    <View style={styles.spendingReportHeader}>
                        <Text style={[typography.MediumInterH4, { color: colors.green08, paddingVertical: 8 }]}>Spending Report</Text>
                        <TouchableOpacity onPress={
                            () => handleDisplayBottomSheetReport(DISPLAY)
                        }>
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
            <BottomSheetReport
                bottomSheetReportRef={bottomSheetReportRef}
            />
            <BottomSheetModal
                backdropComponent={BottomSheetBackdrop}
                ref={bottomSheetSelectWalletRef}
                snapPoints={snapPoints}
                index={2}
                style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, opacity: 0 }}
                handleComponent={CustomHandle}>
                <AddTransactionInputViewHeader
                    backContent='Close'
                    title='Select Wallet'
                    onBackPress={() => {
                        handleBottomSheetSelectWallet(HIDE);
                    }} />
                <View style={{ marginTop: 10 }}>
                    {userWallet.map((wallet, index) => {
                        return (
                            <WalletItem
                                onSelect={() => handleSelectWallet(wallet)}
                                key={index}
                                name={wallet.wallet_name} />
                        )
                    })}
                </View>
            </BottomSheetModal>
        </ScrollView>
    );
}
export default Home;