import { View, Text } from 'react-native'
import React from 'react'
import StackHeader from '../../../components/StackHeader'
import { useNavigation } from '@react-navigation/native'
import WalletItem from '../../../components/WalletItem'
import { useDispatch, useSelector } from 'react-redux'
import { selectWallet } from '../services/walletSlice'

const SettingWallet = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userWallet = useSelector(state => state.wallet.wallets);
    const handleSelectWallet = (wallet) => {
        dispatch(selectWallet(wallet.wallet_id));
        navigation.goBack();
    }
    return (
        <View style={{
            gap: 4,
        }}>
            <StackHeader title='Wallet'
                onBackPress={() => {
                    navigation.goBack();
                }}
            />
            {
                userWallet.map((wallet, index) => {
                    return (
                        <WalletItem
                            onSelect={() => handleSelectWallet(wallet)}
                            key={index}
                            name={wallet.wallet_name} />
                    )
                })
            }
        </View>
    )
}

export default SettingWallet