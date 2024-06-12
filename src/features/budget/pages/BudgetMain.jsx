import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import BudgetSelect from '../components/BudgetSelect';
import typography from '../../../styles/typography';
import LimitList from '../components/LimitList';
import ActionSheet from 'react-native-actions-sheet';
import BottomMenuItem from '../../../components/BottomMenuItem';
import { clearBudgetTimeRange, setBudgetTypeFilter } from '../services/budgetSlice';
import InvestmentList from '../components/InvestmentList';
import ActionSheetSelectTimeRangeBudget from '../components/ActionSheetSelectTimeRangeBudget';
import { getAllLimit } from '../../limit';
import { getAllTransactions } from '../../transaction';

const DISPLAY = true;
const HIDE = false;

const Tab = createMaterialTopTabNavigator();

function BudgetMain(props) {
    const budgetTypeFilter = useSelector(state => state.budget.budgetTypeFilter);
    const { t } = useTranslation();
    const actionSheetBudgetTypeRef = useRef();
    const handleDisplayActionSheetBudgetType = (DISPLAY) => {
        actionSheetBudgetTypeRef.current?.setModalVisible(DISPLAY);
    }

    const actionSheetBudgetTimeRangeRef = useRef(null);
    const handleActionSheetSelectBudgetTimeRangeDisplay = (action) => {
        actionSheetBudgetTimeRangeRef.current.setModalVisible(action);
    }

    const actionSheetCustomizeBudgetTimeRangeRef = useRef();
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

    const dispatch = useDispatch();
    const handleSelectBudgetType = (type) => {
        dispatch(setBudgetTypeFilter(type))
        handleDisplayActionSheetBudgetType(HIDE);
    }
    const dataChange = useSelector(state => state.budget.dataChange)
    const [limitList, setLimitList] = useState([
        {
            "timeRange": "",
            "limitList": []
        }
    ]);

    const groupByDateAndCategory = (list) => {
        return list.reduce((acc, item) => {
            let timeRange = `${item.from_date}-${item.to_date}`;
            if (item.from_date === item.to_date) {
                timeRange = item.from_date;
            }
            if (!acc[timeRange]) {
                acc[timeRange] = {};
            }
            if (!acc[timeRange][item.category_id]) {
                acc[timeRange][item.category_id] = { ...item, amount: 0 };
            }
            acc[timeRange][item.category_id].amount += item.amount;
            return acc;
        }, {});
    }

    const transformData = (groupedLimitList) => {
        const transformedData = Object.entries(groupedLimitList).map(([timeRange, limitList]) => ({
            timeRange,
            limitList
        }));
        return transformedData.sort((a, b) => a.timeRange.length - b.timeRange.length);
    }

    const fetchLimitList = async () => {
        const limitList = await getAllLimit();
        const groupedLimitList = groupByDateAndCategory(limitList);
        const transformedData = transformData(groupedLimitList);
        if (transformedData.length > 0) {
            setLimitList(transformedData);
        }
        else {
            setLimitList([
                {
                    "timeRange": "",
                    "limitList": []
                }
            ]);
        }
    }
    const currentWallet = useSelector(state => state.wallet.currentWallet);
    const [transactions, setTransactions] = useState([{}]);
    const fetchTransactions = async () => {
        setTransactions(await getAllTransactions(currentWallet.wallet_id));
    }

    useEffect(() => {
        fetchLimitList();
        fetchTransactions();
    }, [dataChange, currentWallet.balance])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.typeOfBudget}>
                    <View style={globalStyles.centerAlign}>
                        <TouchableOpacity onPress={() => handleDisplayActionSheetBudgetType(DISPLAY)}>
                            <BudgetSelect selected={budgetTypeFilter} />
                        </TouchableOpacity>
                    </View>
                    {/* <TouchableOpacity
                        onPress={() => handleActionSheetSelectBudgetTimeRangeDisplay(DISPLAY)}
                        style={styles.calendar}>
                        <FontAwesome5 name="calendar-alt" size={24} color={colors.green07} solid />
                    </TouchableOpacity> */}
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
                    {limitList.map((range, index) => (
                        <Tab.Screen
                            key={index}
                            name={t(range.timeRange ? range.timeRange : t('no-data')).toUpperCase()}
                            initialParams={{ range }} >
                            {() => {
                                switch (budgetTypeFilter) {
                                    case 'Investment':
                                        return <InvestmentList />;
                                    case 'Limit':
                                        return <LimitList limitList={range.limitList} transactions={transactions}/>;
                                    default:
                                        return <LimitList limitList={range.limitList} transactions={transactions}/>;
                                }
                            }}
                        </Tab.Screen>
                    ))}
                </Tab.Navigator>
            </View>
            <ActionSheet ref={actionSheetBudgetTypeRef}>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16, textAlign: 'center' }]}>{t('select-budget-type')}</Text>
                    <BottomMenuItem title={t('limit')} onPress={() => handleSelectBudgetType('Limit')} />
                    <BottomMenuItem title={t('investment')} onPress={() => handleSelectBudgetType('Investment')} />
                    <TouchableOpacity
                        onPress={() => handleDisplayActionSheetBudgetType(HIDE)}
                        style={styles.bottomMenuItemContainer}>
                        <Text style={[typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>{t('cancel')}</Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
            <ActionSheetSelectTimeRangeBudget
                actionSheetBudgetTimeRangeRef={actionSheetBudgetTimeRangeRef} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        backgroundColor: 'white',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        flexDirection: 'column',
    },
    typeOfBudget: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    calendar: {
        position: 'absolute',
        right: 0,
        bottom: 8,
    },
    timeRangeContainer: {
        flex: 1,
        backgroundColor: 'white',
    }

})

export default BudgetMain;