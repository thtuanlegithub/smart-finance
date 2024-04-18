import React, { useRef, useState } from 'react';
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
import { clearTimeRange, setCurrentWallet, setTimeRangeEnd, setTimeRangeStart, setTransactionTypeFilter } from '../services/transactionSlice';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useSnapPoints } from '../../../hooks/useSnapPoints';
import CustomHandle from '../../../components/CustomHandle';
import AddTransactionInputViewHeader from '../components/AddTransactionInputViewHeader';
import WalletItem from '../../../components/WalletItem';
import { listWallet } from '../../../data/fakeDataListWallet';
import DatePicker from 'react-native-date-picker';
import { formatDate } from '../../../utils/formatDate';

const Tab = createMaterialTopTabNavigator();

const DISPLAY = true;
const HIDE = false;

function TransactionMain(props) {
    const timeRanges = ['25/3/2024 - 31/3/2024', '1/4/2024 - 7/4/2024', 'Last week', 'This week']
    const actionSheetTransactionTypeRef = useRef();

    const transactionTypeFilter = useSelector(state => state.transaction.transactionTypeFilter);
    const currentWallet = useSelector(state => state.transaction.currentWallet);

    const timeRange = useSelector(state => state.transaction.timeRange);
    const timeRangeStart = useSelector(state => state.transaction.timeRangeStart);
    const timeRangeEnd = useSelector(state => state.transaction.timeRangeEnd);

    const [open, setOpen] = useState(false)
    const [selectForStart, setSelectForStart] = useState(true);

    const dispatch = useDispatch();
    const handleSelectTransactionType = (transactionType) => {
        dispatch(setTransactionTypeFilter(transactionType));
        actionSheetTransactionTypeRef.current?.setModalVisible(false);
    }
    const bottomSheetSelectWalletRef = useRef(null);
    const snapPoints = useSnapPoints();
    const handleSelectWallet = (wallet) => {
        dispatch(setCurrentWallet(wallet));
        bottomSheetSelectWalletRef.current?.close();
    }
    const actionSheetTimeRangeRef = useRef(null);
    const handleActionSheetSelectTimeRangeDisplay = (action) => {
        actionSheetTimeRangeRef.current.setModalVisible(action);
    }

    const actionSheetCustomizeTimeRangeRef = useRef(null);

    const handleActionSheetCustomizeTimeRangeDisplay = (action) => {
        actionSheetCustomizeTimeRangeRef.current.setModalVisible(action);
    }

    const handleTimeRangeSelect = (timeRange) => {
        if (timeRange === 'Customize') {
            handleActionSheetCustomizeTimeRangeDisplay(DISPLAY);
            handleActionSheetSelectTimeRangeDisplay(HIDE);
        }
        else {
            dispatch(clearTimeRange());
            handleActionSheetSelectTimeRangeDisplay(HIDE);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.walletGroup}>
                    <WalletSelect name={currentWallet.name} onSelect={() => bottomSheetSelectWalletRef.current?.present()} />
                    <View style={styles.balancesGroup}>
                        <Text style={[typography.RegularInterH5, { color: colors.green07, textAlign: 'right' }]}>Balances</Text>
                        <Text style={[typography.SemiBoldInterH5, {
                            color: colors.green07
                        }]}>{formatCurrency(currentWallet.amount)} VND</Text>
                    </View>
                </View>
                <View style={styles.typeOfTransaction}>
                    <View style={globalStyles.centerAlign}>
                        <TouchableOpacity onPress={() => actionSheetTransactionTypeRef.current?.setModalVisible(true)}>
                            <TransactionSelect selected={transactionTypeFilter} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => handleActionSheetSelectTimeRangeDisplay(DISPLAY)} style={styles.calendar}>
                        <FontAwesome5 name="calendar-alt" size={24} color={colors.green07} solid />
                    </TouchableOpacity>
                </View>
            </View>
            <ActionSheet ref={actionSheetTransactionTypeRef}>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16, textAlign: 'center' }]}>Select transaction type</Text>
                    <TouchableOpacity
                        onPress={() => handleSelectTransactionType('Expense')}
                        style={styles.bottomMenuItemContainer}>
                        <BottomMenuItem title='Expense' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleSelectTransactionType('Income')}
                        style={styles.bottomMenuItemContainer}>
                        <BottomMenuItem title='Income' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleSelectTransactionType('Debt/ Loan')}
                        style={styles.bottomMenuItemContainer}>
                        <BottomMenuItem title='Debt/ Loan' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleSelectTransactionType(null)}
                        style={styles.bottomMenuItemContainer}>
                        <BottomMenuItem title='All' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => actionSheetTransactionTypeRef.current?.setModalVisible(false)}
                        style={styles.bottomMenuItemContainer}>
                        <Text style={[typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
            <ActionSheet ref={actionSheetTimeRangeRef}>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>Select time range</Text>
                    <TouchableOpacity
                        onPress={() => handleTimeRangeSelect('This week')}
                        style={styles.bottomMenuItemContainer}>
                        <BottomMenuItem title='This week' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleTimeRangeSelect('This month')}
                        style={styles.bottomMenuItemContainer}>
                        <BottomMenuItem title='This month' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleTimeRangeSelect('This year')}
                        style={styles.bottomMenuItemContainer}>
                        <BottomMenuItem title='This year' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleTimeRangeSelect('Customize')}
                        style={styles.bottomMenuItemContainer}>
                        <BottomMenuItem title='Customize' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleActionSheetSelectTimeRangeDisplay(HIDE)}
                        style={styles.bottomMenuItemContainer}>
                        <Text style={
                            [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
            <ActionSheet ref={actionSheetCustomizeTimeRangeRef}>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>Customize time range</Text>
                    <TouchableOpacity onPress={() => {
                        setOpen(true);
                        setSelectForStart(true);
                    }}>
                        {
                            timeRangeStart
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>Start date: {timeRangeStart}</Text>
                                :
                                <Text style={[typography.RegularInterH3, { color: colors.green06, padding: 16 }]}>Select start date </Text>
                        }
                    </TouchableOpacity>
                    <View style={styles.border}>
                    </View>
                    <TouchableOpacity onPress={() => {
                        setOpen(true);
                        setSelectForStart(false);
                    }}>
                        {
                            timeRangeEnd
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>End date: {timeRangeEnd}</Text>
                                :
                                <Text style={[typography.RegularInterH3, { color: colors.green06, padding: 16 }]}>Select end date </Text>
                        }
                    </TouchableOpacity>
                    <View style={[styles.bottomMenuItemContainer, { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 24 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeTimeRangeDisplay(HIDE);
                                handleActionSheetSelectTimeRangeDisplay(DISPLAY);
                            }}>
                            <Text style={
                                [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeTimeRangeDisplay(HIDE);
                                handleActionSheetSelectTimeRangeDisplay(HIDE);
                            }}>
                            <Text style={
                                [typography.RegularInterH3, { color: colors.green07, padding: 16, marginTop: 16 }]}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ActionSheet>
            <DatePicker
                mode='date'
                modal
                open={open}
                date={new Date()}
                onConfirm={(date) => {
                    if (selectForStart) {
                        dispatch(setTimeRangeStart(formatDate(date)));
                    }
                    else {
                        dispatch(setTimeRangeEnd(formatDate(date)));
                    }
                    setOpen(false)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
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
                        bottomSheetSelectWalletRef.current?.close();
                    }} />
                <View style={{ marginTop: 10 }}>
                    {listWallet.map((wallet, index) => {
                        return (
                            <WalletItem
                                onSelect={() => handleSelectWallet(wallet)}
                                key={index}
                                name={wallet.name} />
                        )
                    })}
                </View>
            </BottomSheetModal>
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
                                props => <TransactionList {...props} type={transactionTypeFilter} />
                            }
                        </Tab.Screen>
                    ))}
                </Tab.Navigator>
            </View>
        </View>
    );
}

export default TransactionMain;