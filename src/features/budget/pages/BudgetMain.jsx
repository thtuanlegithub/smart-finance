import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BudgetSelect from '../components/BudgetSelect';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import typography from '../../../styles/typography';
import { useSelector } from 'react-redux';
import SavingList from '../components/SavingList';
import LimitList from '../components/LimitList';
import ActionSheet from 'react-native-actions-sheet';
import BottomMenuItem from '../../../components/BottomMenuItem';
import { useDispatch } from 'react-redux';

import { clearBudgetTimeRange, setBudgetTimeRangeEnd, setBudgetTimeRangeStart, setBudgetTypeFilter } from '../services/budgetSlice';
import DatePicker from 'react-native-date-picker';
import { formatDate } from '../../../utils/formatDate';
import InvestmentList from '../components/InvestmentList';
import ActionSheetSelectTimeRangeBudget from '../components/ActionSheetSelectTimeRangeBudget';
import { useTranslation } from 'react-i18next';
const DISPLAY = true;
const HIDE = false;

const Tab = createMaterialTopTabNavigator();

function BudgetMain(props) {

    const budgetTimeRanges = ['25/3/2024 - 31/3/2024', '1/4/2024 - 7/4/2024', 'last-week', 'this-week'];
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.typeOfBudget}>
                    <View style={globalStyles.centerAlign}>
                        <TouchableOpacity onPress={() => handleDisplayActionSheetBudgetType(DISPLAY)}>
                            <BudgetSelect selected={budgetTypeFilter} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleActionSheetSelectBudgetTimeRangeDisplay(DISPLAY)}
                        style={styles.calendar}>
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
                    {budgetTimeRanges.map((range, index) => (
                        <Tab.Screen
                            key={index}
                            name={t(range).toUpperCase()}
                            initialParams={{ range }}
                        >
                            {() => {
                                switch (budgetTypeFilter) {
                                    case 'Investment':
                                        return <InvestmentList />;
                                    case 'Limit':
                                        return <LimitList />;
                                    default:
                                        return <LimitList />;
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