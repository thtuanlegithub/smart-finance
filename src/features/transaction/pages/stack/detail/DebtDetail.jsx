import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import typography from '../../../../../styles/typography'
import colors from '../../../../../styles/colors'
import transactionCategoryIcons from '../../../../../data/transactionCategoryIcons'
import formatCurrency from '../../../../../utils/formatCurrency'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import LineProgressBar from '../../../../../components/LineProgressBar'
import { useNavigation } from '@react-navigation/native'
import { setDisplayModal, setTransactionCategory, setTransactionReference } from '../../../services/addTransactionFormSlice'
import getCategoryNameById from '../../../../../utils/getCategoryNameById'
import { getCategoryIcons } from '../../../../category'
import getTypeNameById from '../../../../../utils/getTypeNameById'
import { setCurrentTransactionCRUDAction } from '../../../services/transactionSlice'
import { useTranslation } from 'react-i18next'

const DebtDetail = ({ transaction }) => {
    const currentWallet = useSelector(state => state.wallet.currentWallet);
    const navigation = useNavigation();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleAddRepaymentForDebt = () => {
        dispatch(setCurrentTransactionCRUDAction('create'));
        dispatch(setTransactionReference(transaction));
        dispatch(setTransactionCategory('repayment'));
        dispatch(setDisplayModal(true));
    }
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
                        <Text style={{ ...typography.RegularInterH3, color: colors.green08 }}>{t(transaction.category)}</Text>
                    </View>
                    <View style={{
                        backgroundColor: colors.blue05,
                        borderRadius: 20,
                        paddingHorizontal: 16,
                        paddingVertical: 4,
                    }}>
                        <Text style={{ ...typography.RegularInterH5, color: 'white' }}>{t(transaction.type)}</Text>
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
            <View style={{
                marginTop: 8,
                padding: 16,
                paddingHorizontal: 24,
                backgroundColor: 'white'
            }}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'flex-start' }}>
                        <Text style={{
                            ...typography.RegularInterH4, color: colors.green07
                        }}>{t('paid')}</Text>
                        <Text style={{
                            ...typography.MediumInterH4, color: colors.green07
                        }}>{formatCurrency(80000)}</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Text style={{
                            ...typography.RegularInterH4, color: colors.red01
                        }}>{t('left')}</Text>
                        <Text style={{
                            ...typography.MediumInterH4, color: colors.red01
                        }}>{formatCurrency(20000)}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 6 }}>
                    <LineProgressBar
                        mainColor={colors.green06}
                        subColor={colors.green01}
                        current={80000}
                        limit={100000} />
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('List Repayment');
                    }}>
                        <Text style={{
                            marginTop: 16,
                            padding: 16,
                            textAlign: 'center',
                            ...typography.RegularInterH4,
                            color: colors.green07,
                            borderTopColor: colors.gray02,
                            borderTopWidth: 1,
                        }}>{t('view-repayment-list')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleAddRepaymentForDebt}>
                        <Text style={{
                            paddingTop: 16,
                            textAlign: 'center',
                            ...typography.RegularInterH4,
                            color: colors.green07,
                            borderTopColor: colors.gray02,
                            borderTopWidth: 1,
                        }}>{t('add-repayment')}</Text>
                    </TouchableOpacity>
                </View>
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
})

export default DebtDetail