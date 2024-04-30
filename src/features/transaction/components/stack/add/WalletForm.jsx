import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { setTransactionWallet } from '../../../services/addTransactionFormSlice';
import AddTransactionInputViewHeader from '../../AddTransactionInputViewHeader';
import WalletItem from '../../../../../components/WalletItem';
import colors from '../../../../../styles/colors';

const WalletForm = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const listWallet = useSelector(state => state.wallet.wallets);

    const handleSelectWallet = (wallet) => {
        dispatch(setTransactionWallet(wallet));
        navigation.navigate('Add Transaction');
    }

    return (
        <View style={styles.container}>
            <AddTransactionInputViewHeader title='Select Wallet'
                onBackPress={() => {
                    navigation.navigate('Add Transaction');
                }} />
            <View style={{ marginTop: 10 }}>
                {listWallet.map((wallet, index) => {
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