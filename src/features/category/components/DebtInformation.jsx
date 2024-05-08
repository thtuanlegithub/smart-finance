import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import formatCurrency from '../../../utils/formatCurrency';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const DebtInformation = () => {
    const navigation = useNavigation();
    const reference = useSelector(state => state.updateTransactionForm.reference);
    const wallets = useSelector(state => state.wallet.wallets);
    const [wallet, setWallet] = useState(null);
    const { t } = useTranslation();
    
    useEffect(() => {
        setWallet(wallets.find(w => w.wallet_id === reference.wallet));
    }, [reference]);

    return (
        <View style={{ backgroundColor: 'white', marginTop: 10 }}>
            {
                reference
                    ?
                    <>
                        <TouchableOpacity onPress={() => navigation.navigate('Select Debt')} style={styles.debtCard}>
                            <View style={styles.debtCardHeader}>
                                <View style={styles.labelGroup}>
                                    <Image style={styles.icon} source={require('../../../assets/images/debt.png')} />
                                </View>
                                <View style={{ flexDirection: 'column', gap: 4 }}>
                                    <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>{t('debt')}</Text>
                                    <Text style={[typography.MediumInterH3, { color: colors.red01 }]}>{formatCurrency(reference.remain)}</Text>
                                </View>
                            </View>
                            <View style={[styles.inputGroupContainer, { marginBottom: 8 }]}>
                                <View style={styles.subLabelGroup}>
                                    <FontAwesome5 name={inputIcons['note']} size={18} color={colors.green08} style={styles.labelIcon} />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={[typography.RegularInterH5, { color: colors.green08 }]}>{reference.note}</Text>
                                </View>
                            </View>
                            <View style={styles.inputGroupContainer}>
                                <View style={styles.subLabelGroup}>
                                    <FontAwesome5 name={inputIcons['wallet']} size={18} color={colors.green08} style={styles.labelIcon} />
                                </View>
                                <View style={styles.inputGroup}>
                                    <Text style={[typography.RegularInterH5, { color: colors.green08 }]}>{wallet ? wallet.wallet_name : 'Loading...'}</Text>
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
                    </>
                    :
                    <TouchableOpacity onPress={() => navigation.navigate('Select Debt')} style={styles.container}>
                        <View style={styles.labelGroup}>
                            <Image style={styles.icon} source={require('../../../assets/images/debt.png')} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={[typography.RegularInterH5, { color: colors.red01 }]}>Please select debt for this repayment</Text>
                            <FontAwesome5 name="chevron-right" size={18} color={colors.red02} opacity={0.5} />
                        </View>
                    </TouchableOpacity>
            }
        </View>

    )
}

const styles = StyleSheet.create({
    inputGroupContainer: {
        paddingLeft: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingTop: 8
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 14,
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
    debtCard: {
        paddingVertical: 16,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    debtCardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        gap: 8,
    }
})

export default DebtInformation