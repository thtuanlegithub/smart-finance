import React, { useRef } from 'react';
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
import { setCurrentWallet, setTransactionTypeFilter } from '../services/transactionSlice';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useSnapPoints } from '../../../hooks/useSnapPoints';
import CustomHandle from '../../../components/CustomHandle';
import AddTransactionInputViewHeader from '../components/AddTransactionInputViewHeader';
import WalletItem from '../../../components/WalletItem';
import ActionSheetSelectTimeRangeTransaction from '../components/ActionSheetSelectTimeRangeTransaction';
import { selectWallet } from '../../setting';

const Tab = createMaterialTopTabNavigator();

const DISPLAY = true;

function TransactionMain(props) {

    const userWallet = useSelector(state => state.wallet.wallets);

    const transactionTimeRanges = ['25/3/2024 - 31/3/2024', '1/4/2024 - 7/4/2024', 'Last week', 'This week']
    const actionSheetTransactionTypeRef = useRef();

    const transactionTypeFilter = useSelector(state => state.transaction.transactionTypeFilter);
    const currentWallet = useSelector(state => state.wallet.currentWallet);

    const transactionTimeRange = useSelector(state => state.transaction.transactionTimeRange);

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


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.walletGroup}>
                    <WalletSelect name={currentWallet.wallet_name} onSelect={() => bottomSheetSelectWalletRef.current?.present()} />
                    <View style={styles.balancesGroup}>
                        <Text style={[typography.RegularInterH5, { color: colors.green07, textAlign: 'right' }]}>Balances</Text>
                        <Text style={[typography.SemiBoldInterH5, {
                            color: colors.green07
                        }]}>{formatCurrency(currentWallet.balance)} VND</Text>
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
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16, textAlign: 'center' }]}>Select transaction type</Text>
                    <BottomMenuItem
                        title='Expense'
                        onPress={() => handleSelectTransactionType('expense')} />
                    <BottomMenuItem
                        title='Income'
                        onPress={() => handleSelectTransactionType('income')}
                    />
                    <BottomMenuItem
                        title='Debt/ Loan'
                        onPress={() => handleSelectTransactionType('debt_loan')} />
                    <BottomMenuItem
                        title='All'
                        onPress={() => handleSelectTransactionType(null)} />
                    <TouchableOpacity
                        onPress={() => actionSheetTransactionTypeRef.current?.setModalVisible(false)}
                        style={styles.bottomMenuItemContainer}>
                        <Text style={[typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>Cancel</Text>
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
                    backContent='Close'
                    title='Select Wallet'
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
                <Tab.Navigator
                    initialRouteName={transactionTimeRange ? transactionTimeRange : 'This week'}
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
                    {transactionTimeRanges.map((range, index) => (
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