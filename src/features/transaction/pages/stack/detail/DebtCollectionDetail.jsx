import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import typography from '../../../../../styles/typography'
import colors from '../../../../../styles/colors'
import transactionCategoryIcons from '../../../../../data/transactionCategoryIcons'
import formatCurrency from '../../../../../utils/formatCurrency'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import getCategoryNameById from '../../../../../utils/getCategoryNameById'
import { getCategoryIcons } from '../../../../category'
import getTypeNameById from '../../../../../utils/getTypeNameById'

const DebtCollectionDetail = ({ transaction }) => {
    const currentWallet = useSelector(state => state.wallet.currentWallet);
    const reference = useSelector(state => state.addTransactionForm.reference);
    const navigation = useNavigation();
    return (
        <>
            <View style={styles.container}>
                <View style={styles.transactionCard}>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <FastImage
                            style={{ width: 24, height: 24 }}
                            source={getCategoryIcons(transaction.category)}
                            resizeMode='contain'
                        />
                        <Text style={{ ...typography.RegularInterH3, color: colors.green08 }}>{getCategoryNameById(transaction.category)}</Text>
                    </View>
                    <View style={{
                        backgroundColor: colors.blue05,
                        borderRadius: 20,
                        paddingHorizontal: 16,
                        paddingVertical: 4,
                    }}>
                        <Text style={{ ...typography.RegularInterH5, color: 'white' }}>{getTypeNameById[transaction.type]}</Text>
                    </View>
                </View>
                <Text style={{
                    ...typography.MediumInterH3,
                    color: colors.green07,
                    marginLeft: 40,
                }}>{formatCurrency(transaction.amount)}</Text>
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
            <View style={{ marginTop: 2 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Transaction Detail', { transaction: reference })} style={styles.loanCard}>
                    <View style={styles.loanCardHeader}>
                        <View style={styles.labelGroup}>
                            <FastImage style={styles.icon} source={transactionCategoryIcons["Loan"]} />
                        </View>
                        <View style={{ flexDirection: 'column', gap: 4 }}>
                            <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>Loan</Text>
                            <Text style={[typography.MediumInterH3, { color: colors.red01 }]}>{formatCurrency(reference?.remain)}</Text>
                        </View>
                    </View>
                    <View style={[styles.inputGroupContainer, { marginBottom: 8 }]}>
                        <View style={styles.subLabelGroup}>
                            <FontAwesome5 name={inputIcons['note']} size={18} color={colors.green08} style={styles.labelIcon} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={[typography.RegularInterH5, { color: colors.green08 }]}>{reference?.note}</Text>
                        </View>
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <View style={styles.subLabelGroup}>
                            <FontAwesome5 name={inputIcons['wallet']} size={18} color={colors.green08} style={styles.labelIcon} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={[typography.RegularInterH5, { color: colors.green08 }]}>{reference?.wallet}</Text>
                        </View>
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <View style={styles.subLabelGroup}>
                            <FontAwesome5 name={inputIcons['date']} size={18} color={colors.green08} style={styles.labelIcon} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={[typography.RegularInterH5, { color: colors.green08 }]}>March 20, 2024</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        </>
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

    inputGroupContainer: {
        paddingLeft: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingTop: 8
    },
    labelGroup: {
        width: 61,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subLabelGroup: {
        width: 61,
        paddingLeft: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputGroup: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
    loanCard: {
        paddingVertical: 16,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    loanCardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        gap: 8,
    }
})

export default DebtCollectionDetail