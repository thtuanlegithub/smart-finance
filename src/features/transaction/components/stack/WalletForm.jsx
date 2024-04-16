import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AddTransactionInputViewHeader from '../AddTransactionInputViewHeader';
import WalletItem from '../../../../components/WalletItem';
import { useDispatch } from 'react-redux';
import { setTransactionWallet } from '../../services/addTransactionFormSlice';
import colors from '../../../../styles/colors';

const listWallet = [{
    name: 'Wallet 1',
    amount: 1000000
}, {
    name: 'Wallet 2',
    amount: 2000000
}, {
    name: 'Wallet 3',
    amount: 4000000
}];

const WalletForm = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleSelectWallet = (wallet) => {
        dispatch(setTransactionWallet(wallet.name));
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
                            name={wallet.name} />
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