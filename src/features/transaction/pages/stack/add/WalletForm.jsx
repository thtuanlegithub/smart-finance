import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { setTransactionWallet } from '../../../services/addTransactionFormSlice';
import AddTransactionInputViewHeader from '../../../components/AddTransactionInputViewHeader';
import WalletItem from '../../../../../components/WalletItem';
import colors from '../../../../../styles/colors';
import { setUpdateTransactionWallet } from '../../../services/updateTransactionFormSlice';
import { useTranslation } from 'react-i18next';

const WalletForm = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const userWallet = useSelector(state => state.wallet.wallets);
    const currentTransactionCRUDAction = useSelector(state => state.transaction.currentTransactionCRUDAction)
    
    const handleSelectWallet = (wallet) => {
        if (currentTransactionCRUDAction === 'create') {
            dispatch(setTransactionWallet(wallet));
        }
        else if (currentTransactionCRUDAction === 'update') {
            dispatch(setUpdateTransactionWallet(wallet));
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <AddTransactionInputViewHeader title={t('select-wallet')}
                onBackPress={() => {
                    navigation.goBack();
                }}
            />
            <View style={{ marginTop: 10 }}>
                {userWallet.map((wallet, index) => {
                    return (
                        <WalletItem
                            onSelect={() => handleSelectWallet(wallet)}
                            key={index}
                            name={wallet.wallet_name} />
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray01,
        flexDirection: 'column',
    },
    navBar: {
        borderTopWidth: 0.5,
        borderColor: colors.gray03,
        flex: 1,
        backgroundColor: 'white',
    }
})

export default WalletForm