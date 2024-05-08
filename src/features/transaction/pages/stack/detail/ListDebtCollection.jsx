import { View, Text } from 'react-native'
import React from 'react'
import TransactionNavigationHeader from '../../../components/TransactionNavigationHeader'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import ListDebtCollectionItem from './ListDebtCollectionItem';
import { useTranslation } from 'react-i18next';
const listDebtCollection = [
    {
        id: 1,
        category: 'Debt collection',
        type: 'Debt collection',
        amount: 1000000,
        note: 'Debt collection from A',
        date: '2021-09-01',
    },
    {
        id: 2,
        category: 'Debt collection',
        type: 'Debt collection',
        amount: 2000000,
        note: 'Debt collection from B',
        date: '2021-09-02',
    },
    {
        id: 3,
        category: 'Debt collection',
        type: 'Debt collection',
        amount: 3000000,
        note: 'Debt collection from C',
        date: '2021-09-03',
    },
    {
        id: 4,
        category: 'Debt collection',
        type: 'Debt collection',
        amount: 4000000,
        note: 'Debt collection from D',
        date: '2021-09-04',
    },
    {
        id: 5,
        category: 'Debt collection',
        type: 'Debt collection',
        amount: 5000000,
        note: 'Debt collection from E',
        date: '2021-09-05',
    },
]
const ListDebtCollection = () => {
    const navigation = useNavigation(); 
    const { t } = useTranslation();
    return (
        <View>
            <TransactionNavigationHeader
                onBackPress={() => {
                    navigation.goBack();
                }}
                title={t('debt-collection-list')} />
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={listDebtCollection}
                renderItem={({ item }) => <ListDebtCollectionItem transaction={item} />}
            />
        </View>
    )
}

export default ListDebtCollection