import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import typography from '../../../../../styles/typography'
import colors from '../../../../../styles/colors'
import transactionCategoryIcons from '../../../../../data/transactionCategoryIcons'
import formatCurrency from '../../../../../utils/formatCurrency'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux'
import { getCategoryIcons } from '../../../../category'
import getCategoryNameById from '../../../../../utils/getCategoryNameById'
import getTypeNameById from '../../../../../utils/getTypeNameById'

const ExpenseDetail = ({ transaction }) => {
    const currentWallet = useSelector(state => state.wallet.currentWallet);
    return (
        <View style={styles.container}>
            <View style={styles.transactionCard}>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <FastImage
                        style={{ width: 30, height: 30 }}
                        source={getCategoryIcons(transaction.category)}
                        resizeMode='contain'
                    />
                    <Text style={{ ...typography.RegularInterH3, color: colors.green08 }}>{getCategoryNameById(transaction.category)}</Text>
                </View>
                <View style={{
                    backgroundColor: colors.red05,
                    borderRadius: 20,
                    paddingHorizontal: 16,
                    paddingVertical: 4,
                }}>
                    <Text style={{ ...typography.RegularInterH5, color: 'white' }}>{getTypeNameById[transaction.type]}</Text>
                </View>
            </View>
            {
                transaction.category == 'Debt' || transaction.category == 'Debt Collection'
                &&
                < Text style={{
                    ...typography.MediumInterH3,
                    color: colors.red01,
                    marginLeft: 40,
                }}>{formatCurrency(transaction.amount)}</Text>
            }
            {
                transaction.category == 'Loan' || transaction.category == 'Repayment'
                &&
                < Text style={{
                    ...typography.MediumInterH3,
                    color: colors.red01,
                    marginLeft: 40,
                }}>{formatCurrency(transaction.amount)}</Text>
            }
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 10, marginLeft: 8 }}>
                <FontAwesome5 name='align-left' size={18} color={colors.green07} solid />
                <Text style={{ ...typography.RegularInterH4, color: colors.green07, marginLeft: 8 }}>{transaction.note}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 10, marginLeft: 8 }}>
                <FontAwesome5 name='calendar-day' size={18} color={colors.green07} solid />
                <Text style={{ ...typography.RegularInterH4, color: colors.green07, marginLeft: 8 }}>{transaction.date}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 10, marginLeft: 8 }}>
                <FontAwesome5 name='wallet' size={18} color={colors.green07} solid />
                <Text style={{ ...typography.RegularInterH4, color: colors.green07, marginLeft: 8 }}>{currentWallet.wallet_name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 2,
        padding: 16,
        paddingHorizontal: 24,
        backgroundColor: 'white',
    },
    transactionCard: {
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})

export default ExpenseDetail