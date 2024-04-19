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
import { clearBudgetTimeRange, setCurrentWallet, setBudgetTimeRangeEnd, setBudgetTimeRangeStart, setTransactionTypeFilter } from '../services/transactionSlice';
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
    const budgetTimeRanges = ['25/3/2024 - 31/3/2024', '1/4/2024 - 7/4/2024', 'Last week', 'This week']
    const actionSheetTransactionTypeRef = useRef();

    const transactionTypeFilter = useSelector(state => state.transaction.transactionTypeFilter);
    const currentWallet = useSelector(state => state.transaction.currentWallet);

    const budgetTimeRange = useSelector(state => state.transaction.budgetTimeRange);
    const budgetTimeRangeStart = useSelector(state => state.transaction.budgetTimeRangeStart);
    const budgetTimeRangeEnd = useSelector(state => state.transaction.budgetTimeRangeEnd);

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
    const actionSheetBudgetTimeRangeRef = useRef(null);
    const handleActionSheetSelectBudgetTimeRangeDisplay = (action) => {
        actionSheetBudgetTimeRangeRef.current.setModalVisible(action);
    }

    const actionSheetCustomizeBudgetTimeRangeRef = useRef(null);

    const handleActionSheetCustomizeBudgetTimeRangeDisplay = (action) => {
        actionSheetCustomizeBudgetTimeRangeRef.current.setModalVisible(action);
    }

    const handleBudgetTimeRangeSelect = (budgetTimeRange) => {
        if (budgetTimeRange === 'Customize') {
            handleActionSheetCustomizeBudgetTimeRangeDisplay(DISPLAY);
            handleActionSheetSelectBudgetTimeRangeDisplay(HIDE);
        }
        else {
            dispatch(clearBudgetTimeRange());
            handleActionSheetSelectBudgetTimeRangeDisplay(HIDE);
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
                    <TouchableOpacity onPress={() => handleActionSheetSelectBudgetTimeRangeDisplay(DISPLAY)} style={styles.calendar}>
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
            <ActionSheet ref={actionSheetBudgetTimeRangeRef}>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>Select time range</Text>
                    <TouchableOpacity
                        onPress={() => handleBudgetTimeRangeSelect('This week')}
                        style={styles.bottomMenuItemContainer}>
                        <BottomMenuItem title='This week' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleBudgetTimeRangeSelect('This month')}
                        style={styles.bottomMenuItemContainer}>
                        <BottomMenuItem title='This month' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleBudgetTimeRangeSelect('This year')}
                        style={styles.bottomMenuItemContainer}>
                        <BottomMenuItem title='This year' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleBudgetTimeRangeSelect('Customize')}
                        style={styles.bottomMenuItemContainer}>
                        <BottomMenuItem title='Customize' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleActionSheetSelectBudgetTimeRangeDisplay(HIDE)}
                        style={styles.bottomMenuItemContainer}>
                        <Text style={
                            [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
            <ActionSheet ref={actionSheetCustomizeBudgetTimeRangeRef}>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>Customize time range</Text>
                    <TouchableOpacity onPress={() => {
                        setOpen(true);
                        setSelectForStart(true);
                    }}>
                        {
                            budgetTimeRangeStart
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>Start date: {budgetTimeRangeStart}</Text>
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
                            budgetTimeRangeEnd
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>End date: {budgetTimeRangeEnd}</Text>
                                :
                                <Text style={[typography.RegularInterH3, { color: colors.green06, padding: 16 }]}>Select end date </Text>
                        }
                    </TouchableOpacity>
                    <View style={[styles.bottomMenuItemContainer, { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 24 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeBudgetTimeRangeDisplay(HIDE);
                                handleActionSheetSelectBudgetTimeRangeDisplay(DISPLAY);
                            }}>
                            <Text style={
                                [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeBudgetTimeRangeDisplay(HIDE);
                                handleActionSheetSelectBudgetTimeRangeDisplay(HIDE);
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
                        dispatch(setBudgetTimeRangeStart(formatDate(date)));
                    }
                    else {
                        dispatch(setBudgetTimeRangeEnd(formatDate(date)));
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
                    {budgetTimeRanges.map((range, index) => (
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