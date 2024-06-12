import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import ReportHeader from './ReportHeader';
import { useNavigation } from '@react-navigation/native';
import formatCurrency from '../../../utils/formatCurrency';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import DayTransactionsGroup from '../../transaction/components/transactionitem/DayTransactionsGroup';
import { FlatList } from 'react-native-gesture-handler';

import fakeDataTransactionList from '../../../data/fakeDataTransactionList';
import { useTranslation } from 'react-i18next';

const TimeRangeDetailReport = ({ route }) => {
    const navigation = useNavigation();
    const { selectedItem } = route.params;
    const { t } = useTranslation();

    const fakeDataTransactionListFilter = fakeDataTransactionList.map(item => {
        return {
            ...item,
            transactions: item.transactions.filter(transaction => transaction.type == 'Expense')
        };
    }).filter(item => item.transactions.length > 0); 
    
    return (
        <View style={styles.container}>
            <ReportHeader
                item={selectedItem}
                onBackPress={() => {
                    navigation.goBack();
                }}
                title={selectedItem?.label} />
            <FlatList
                ListHeaderComponent={
                    <View style={styles.spaceBetween}>
                        <Text style={
                            {
                                ...typography.MediumInterH4,
                                color: colors.green07,
                            }
                        }>{t('total-expense-of-this-time')}</Text>
                        <Text style={{
                            ...typography.SemiBoldInterH4,
                            color: colors.red01,
                        }}>{formatCurrency(200000)}</Text>
                    </View>
                }
                gap={16}
                data={fakeDataTransactionListFilter}
                renderItem={({ item }) => <DayTransactionsGroup {...item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    spaceBetween: {
        marginTop: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: 'white',
    },
});

export default TimeRangeDetailReport