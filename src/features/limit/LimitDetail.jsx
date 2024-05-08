import { View, Text, FlatList } from 'react-native'
import React from 'react'
import StackHeader from '../../components/StackHeader'
import LimitCard from '../budget/components/LimitCard'
import DayTransactionsGroup from '../transaction/components/transactionitem/DayTransactionsGroup'
import fakeDataTransactionList from '../../data/fakeDataTransactionList'
import { useDispatch, useSelector } from 'react-redux'
import { setUpdateLimitBottomSheetDisplay } from './services/UpdateLimitSlice'

const LimitDetail = () => {
    const selectedLimitItem = useSelector(state => state.budget.selectedLimitItem)
    const expenseTransactionList = fakeDataTransactionList.map(item => {
        return {
            ...item,
            transactions: item.transactions.filter(transaction => transaction.category == selectedLimitItem.category)
        };
    }).filter(item => item.transactions.length > 0);
    const dispatch = useDispatch();
    const handleEditLimit = (selectedLimitItem) => {
        console.log('Edit limit', selectedLimitItem)
        dispatch(setUpdateLimitBottomSheetDisplay(true));
    }
    return (
        <View style={{ flex: 1 }}>
            <StackHeader
                title='Limit Detail'
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
            </View>
        </View>
    )
}

export default LimitDetail