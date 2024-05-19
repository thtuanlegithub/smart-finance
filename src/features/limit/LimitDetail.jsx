import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import StackHeader from '../../components/StackHeader'
import LimitCard from '../budget/components/LimitCard'
import DayTransactionsGroup from '../transaction/components/transactionitem/DayTransactionsGroup'
import fakeDataTransactionList from '../../data/fakeDataTransactionList'
import { useDispatch, useSelector } from 'react-redux'
import { setNavigationGoBack, setUpdateLimitAmount, setUpdateLimitBottomSheetDisplay, setUpdateLimitCategory, setUpdateLimitId, setUpdateLimitTimeRange, setUpdateLimitTimeRangeEnd, setUpdateLimitTimeRangeStart, setUpdateLimitWallet } from './services/UpdateLimitSlice'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import typography from '../../styles/typography'
import ConfirmDialog from '../../components/ConfirmDialog'
import { deleteLimit } from './services/AddLimitSlice'

const LimitDetail = () => {
    const selectedLimitItem = useSelector(state => state.budget.selectedLimitItem)
    const { t } = useTranslation();
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
    const expenseTransactionList = fakeDataTransactionList.map(item => {
        return {
            ...item,
            transactions: item.transactions.filter(transaction => transaction.category == selectedLimitItem.category)
        };
    }).filter(item => item.transactions.length > 0);
    const dispatch = useDispatch();
    const handleEditLimit = (selectedLimitItem) => {
        const limit = selectedLimitItem;
        dispatch(setUpdateLimitId(limit.limit_id));
        switch (limit.from_date.length) {
            case 4:
                dispatch(setUpdateLimitTimeRange('year'));
                break;
            case 7:
                dispatch(setUpdateLimitTimeRange('month'));
                break;
            case 10:
                dispatch(setUpdateLimitTimeRange('week'));
                break;
        }
        dispatch(setUpdateLimitTimeRangeStart(limit.from_date));
        dispatch(setUpdateLimitTimeRangeEnd(limit.to_date));
        dispatch(setUpdateLimitWallet(limit.wallet_id));
        dispatch(setUpdateLimitCategory(limit.category_id));
        dispatch(setUpdateLimitAmount(limit.amount));
        dispatch(setUpdateLimitBottomSheetDisplay(true));
    }

    const navigationGoBack = useSelector(state => state.updateLimit.navigationGoBack);
    const navigation = useNavigation();
    useEffect(() => {
        if (navigationGoBack) {
            dispatch(setNavigationGoBack(false));
            navigation.goBack();
        }
    }, [navigationGoBack]);

    const handleDeleteLimit = async () => {
        await deleteLimit(selectedLimitItem.limit_id);
        dispatch(setDataChange(!dataChange));
        navigation.goBack();
    }

    return (
        <View style={{ flex: 1 }}>
            <StackHeader
                title={t('limit-detail')}
                onEditPress={() => {
                    handleEditLimit(selectedLimitItem);
                }}
            />
            <View>
                <FlatList
                    ListHeaderComponent={
                        <LimitCard {...selectedLimitItem} />
                    }
                    data={expenseTransactionList}
                    renderItem={({ item }) => <DayTransactionsGroup nestFrom='Limit' {...item} />}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => setConfirmDialogVisible(true)}>
                    <Text style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        paddingVertical: 16,
                        backgroundColor: 'white',
                        color: colors.red01,
                        marginTop: 4,
                        ...typography.MediumInterH4
                    }}>{t('delete')}</Text>
                </TouchableOpacity>
                <ConfirmDialog
                    visible={confirmDialogVisible}
                    title={t('delete-title')}
                    message={t('delete-message')}
                    onConfirm={() => {
                        handleDeleteLimit()
                        setConfirmDialogVisible(false)
                    }}
                    onCancel={() => { setConfirmDialogVisible(false) }}
                />
            </View>
        </View>
    )
}

export default LimitDetail