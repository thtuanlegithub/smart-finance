import { View, Text } from 'react-native'
import React from 'react'
import StackHeader from '../../../components/StackHeader'
import { useNavigation } from '@react-navigation/native'

const SettingWallet = () => {
    const navigation = useNavigation();
    return (
        <View>
            <StackHeader title='Wallet'
                onBackPress={() => {
                    navigation.goBack();
                }}
            />
        </View>
    )
}

export default SettingWallet