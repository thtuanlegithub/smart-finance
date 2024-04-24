import { View, Text } from 'react-native'
import React from 'react'
import styles from '../styles/TransactionStyles';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import formatCurrency from '../../../utils/formatCurrency';
import DayTransactionsGroup from './DayTransactionsGroup';
import { FlatList } from 'react-native-gesture-handler';


const transactionList = [{ id: '1' }, { id: '2' }, { id: '3' }];

const TransactionsList = (props) => {
    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <View style={styles.transactionListQuickReport}>
                        {props.type
                            ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>Total {props.type} of this time: </Text>
                                <Text style={[typography.SemiBoldInterH4, { color: colors.green08 }]}>{formatCurrency(1500000)}</Text>
                            </View>
                            :
                            <View style={{ flexDirection: 'column', gap: 4 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>Total Expense of this time: </Text>
                                    <Text style={[typography.SemiBoldInterH4, { color: colors.green08 }]}>{formatCurrency(1500000)}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>Total Income of this time: </Text>
                                    <Text style={[typography.SemiBoldInterH4, { color: colors.green08 }]}>{formatCurrency(1500000)}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>Total Debt/ Loan of this time: </Text>
                                    <Text style={[typography.SemiBoldInterH4, { color: colors.green08 }]}>{formatCurrency(1500000)}</Text>
                                </View>
                            </View>

                        }
                    </View>
                }
                data={transactionList}
                renderItem={({ item }) => <DayTransactionsGroup {...item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default TransactionsList