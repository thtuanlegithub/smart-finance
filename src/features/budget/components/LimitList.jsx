import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native'
import colors from '../../../styles/colors'
import typography from '../../../styles/typography'; import React, { useEffect, useRef, useState } from 'react'
import SemiCircularProgress from '../../../components/SemiCircularProgress'
import LimitCard from './LimitCard';
import { useDispatch, useSelector } from 'react-redux';
import { setAddLimitBottomSheetDisplay } from '../../limit';
import { useNavigation } from '@react-navigation/native';
import { setSelectedLimitItem } from '../services/budgetSlice';
import { useTranslation } from 'react-i18next';
import { parse, isWithinInterval, endOfMonth, endOfYear } from 'date-fns';

const LimitList = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { t } = useTranslation();
    const limitList = Object.values(props.limitList || {});
    const transactions = props.transactions;

    const parseFromDate = (dateStr) => {
        const parts = dateStr.split('/');
        if (parts.length === 1) {
            // Only year is provided
            return new Date(parts[0], 0, 1); // January 1st of that year
        } else if (parts.length === 2) {
            // Month and year are provided
            return new Date(parts[1], parts[0] - 1, 1); // First day of that month
        } else if (parts.length === 3) {
            // Full date is provided
            return new Date(parts[2], parts[1] - 1, parts[0]); // The exact date
        }
        return null;
    };

    const parseToDate = (dateStr) => {
        const parts = dateStr.split('/');
        if (parts.length === 1) {
            // Only year is provided
            return endOfYear(new Date(parts[0], 0, 1)); // Last day of that year
        } else if (parts.length === 2) {
            // Month and year are provided
            return endOfMonth(new Date(parts[1], parts[0] - 1, 1)); // Last day of that month
        } else if (parts.length === 3) {
            // Full date is provided
            return new Date(parts[2], parts[1] - 1, parts[0]); // The exact date
        }
        return null;
    };

    const calculateCurrent = (limit, transactions) => {
        const fromDate = parseFromDate(limit.from_date);
        const toDate = parseToDate(limit.to_date);
        const relevantTransactions = transactions.filter(transaction => {
            if (!transaction || typeof transaction.created_at !== 'string') {
                return false;
            }
            const transactionDate = parse(transaction.created_at, 'MMMM dd, yyyy', new Date());
            return transaction.category_id === limit.category_id
                && isWithinInterval(transactionDate, { start: fromDate, end: toDate });
        });
        const current = relevantTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        return { ...limit, current };
    };

    const [updatedLimitList, setUpdatedLimitList] = useState([]);
    const handleLoadData = () => {
        const updatedList = limitList.map(limit => calculateCurrent(limit, transactions));
        setUpdatedLimitList(updatedList);
    }

    useEffect(() => {
        handleLoadData();
    }, [transactions])
    return (
        <>
            <View style={styles.container}>
                <FlatList
                    ListHeaderComponent={
                        <View style={{ backgroundColor: 'white', paddingBottom: 16 }}>
                            <View style={styles.limitBudgetQuickReport}>
                                <SemiCircularProgress
                                    fill={25}
                                    labelTextColor={colors.red05}
                                    contentTextColor={colors.red02}
                                    limitList={updatedLimitList} />
                            </View>
                            <View style={styles.createNewBudgetContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(setAddLimitBottomSheetDisplay(true))
                                    }}
                                    style={styles.btnCreateNewBudget}>
                                    <Text style={{ ...typography.MediumInterH5, color: 'white' }}>{t('create-new-limit')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    data={updatedLimitList}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(setSelectedLimitItem(item))
                                navigation.navigate('Limit Detail', { ...item })
                            }}
                            style={{
                                paddingTop: 16,
                                paddingHorizontal: 16,
                            }}>
                            <LimitCard
                                {...item} />
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.limit_id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    limitBudgetQuickReport: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 16,
    },
    createNewBudgetContainer: {
        alignItems: 'flex-end',
        paddingHorizontal: 16,
    },
    btnCreateNewBudget: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.green07,
        borderRadius: 24,
    }
})

export default LimitList