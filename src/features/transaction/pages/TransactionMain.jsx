import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
import ActionSheet from 'react-native-actions-sheet';
import BottomMenuItem from '../../../components/BottomMenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions, getTransactionsByRange, groupTransactionsByMonth, groupTransactionsByWeek, groupTransactionsByYear, setCurrentWallet, setTransactionTypeFilter } from '../services/transactionSlice';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useSnapPoints } from '../../../hooks/useSnapPoints';
import CustomHandle from '../../../components/CustomHandle';
import AddTransactionInputViewHeader from '../components/AddTransactionInputViewHeader';
import WalletItem from '../../../components/WalletItem';
import ActionSheetSelectTimeRangeTransaction from '../components/ActionSheetSelectTimeRangeTransaction';
import { selectWallet } from '../../setting';
import { useTranslation } from 'react-i18next';
import { parse } from 'date-fns';

const Tab = createMaterialTopTabNavigator();

const DISPLAY = true;

function TransactionMain(props) {

    const userWallet = useSelector(state => state.wallet.wallets);
    const { t } = useTranslation();
    const actionSheetTransactionTypeRef = useRef();
    const dispatch = useDispatch();
    const handleSelectTransactionType = (transactionType) => {
        dispatch(setTransactionTypeFilter(transactionType));
        actionSheetTransactionTypeRef.current?.setModalVisible(false);
    }
    const bottomSheetSelectWalletRef = useRef(null);
    const snapPoints = useSnapPoints();
    const handleSelectWallet = (wallet) => {
        dispatch(selectWallet(wallet.wallet_id));
        bottomSheetSelectWalletRef.current?.close();
    }

    const actionSheetTransactionTimeRangeRef = useRef(null);
    const handleActionSheetSelectTransactionTimeRangeDisplay = (action) => {
        actionSheetTransactionTimeRangeRef.current.setModalVisible(action);
    }
    
    const transactionTypeFilter = useSelector(state => state.transaction.transactionTypeFilter);
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
            transactions = await getTransactionsByRange(currentWallet.wallet_id, start, end);
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
            if (newTransactionTimeRanges.length > 0){
                setTransactionTimeRanges(newTransactionTimeRanges);
            }
            else {
                setTransactionTimeRanges([
                    {
                        "timeRange": "",
                        "transactions": []
                    }
                ]);
            }
        }
    }, [timeRange]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.walletGroup}>
                    <WalletSelect name={currentWallet.wallet_name} onSelect={() => bottomSheetSelectWalletRef.current?.present()} />
                    <View style={styles.balancesGroup}>
                        <Text style={[typography.RegularInterH5, { color: colors.green07, textAlign: 'right' }]}>{t('total-balance')}</Text>
                        <Text style={[typography.SemiBoldInterH5, {
                            color: colors.green07
                        }]}>{formatCurrency(currentWallet.balance.toString())} VND</Text>
                    </View>
                </View>
                <View style={styles.typeOfTransaction}>
                    <View style={globalStyles.centerAlign}>
                        <TouchableOpacity onPress={() => actionSheetTransactionTypeRef.current?.setModalVisible(true)}>
                            <TransactionSelect selected={transactionTypeFilter} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleActionSheetSelectTransactionTimeRangeDisplay(DISPLAY)}
                        style={styles.calendar}>
                        <FontAwesome5 name="calendar-alt" size={24} color={colors.green07} solid />
                    </TouchableOpacity>
                </View>
            </View>
            <ActionSheet ref={actionSheetTransactionTypeRef}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16, textAlign: 'center' }]}>{t('select-transaction-type')}</Text>
                    <BottomMenuItem
                        title={t('expense')}
                        onPress={() => handleSelectTransactionType('expense')} />
                    <BottomMenuItem
                        title={t('income')}
                        onPress={() => handleSelectTransactionType('income')}
                    />
                    <BottomMenuItem
                        title={t('debt/loan')}
                        onPress={() => handleSelectTransactionType('debt_loan')} />
                    <BottomMenuItem
                        title={t('all')}
                        onPress={() => handleSelectTransactionType(null)} />
                    <TouchableOpacity
                        onPress={() => actionSheetTransactionTypeRef.current?.setModalVisible(false)}
                        style={styles.bottomMenuItemContainer}>
                        <Text style={[typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>{t('cancel')}</Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
            <ActionSheetSelectTimeRangeTransaction
                actionSheetTransactionTimeRangeRef={actionSheetTransactionTimeRangeRef} />
            <BottomSheetModal
                backdropComponent={BottomSheetBackdrop}
                ref={bottomSheetSelectWalletRef}
                snapPoints={snapPoints}
                index={2}
                style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, opacity: 0 }}
                handleComponent={CustomHandle}>
                <AddTransactionInputViewHeader
                    backContent={t('close')}
                    title={t('select-wallet')}
                    onBackPress={() => {
                        bottomSheetSelectWalletRef.current?.close();
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
            <View style={styles.timeRangeContainer}>
                {
                    transactionTimeRanges.length > 0
                    &&
                    <Tab.Navigator
                        initialRouteName={transactionTimeRange ? transactionTimeRange : 'This week'}
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
                        {transactionTimeRanges.map((range, index) => (
                            <Tab.Screen
                                key={index}
                                name={t(range.timeRange ? range.timeRange : t('no-data')).toUpperCase()}
                                initialParams={{ range }}>
                                {
                                    props => <TransactionList {...props} 
                                    type={transactionTypeFilter} 
                                    transactions={range.transactions} />
                                }
                            </Tab.Screen>
                        ))}
                    </Tab.Navigator>
                }
            </View>
        </View>
    );
}

export default TransactionMain;