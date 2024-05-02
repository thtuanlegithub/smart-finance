import { View, Text } from 'react-native'
import React from 'react'
import TransactionNavigationHeader from '../../TransactionNavigationHeader'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import ListRepaymentItem from './ListRepaymentItem';

const listRepayment = [
    {
        id: 1,
        category: 'Repayment',
        type: 'Repayment',
        amount: 1000000,
        note: 'Repayment to A',
        date: '2021-09-01',
    },
    {
        id: 2,
        category: 'Repayment',
        type: 'Repayment',
        amount: 2000000,
        note: 'Repayment to B',
        date: '2021-09-02',
    },
    {
        id: 3,
        category: 'Repayment',
        type: 'Repayment',
        amount: 3000000,
        note: 'Repayment to C',
        date: '2021-09-03',
    },
    {
        id: 4,
        category: 'Repayment',
        type: 'Repayment',
        amount: 4000000,
        note: 'Repayment to D',
        date: '2021-09-04',
    },
    {
        id: 5,
        category: 'Repayment',
        type: 'Repayment',
        amount: 5000000,
        note: 'Repayment to E',
        date: '2021-09-05',
    },
]

const ListRepayment = () => {
    const navigation = useNavigation();
    return (
        <View>
            <TransactionNavigationHeader
                onBackPress={() => {
                    navigation.goBack();
                }}
                title='Repayment List' />
            <FlatList
                data={listRepayment}
                renderItem={
                    ({ item }) => <ListRepaymentItem transaction={item} />
                } />
        </View>
    )
}

export default ListRepayment