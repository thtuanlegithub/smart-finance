import { View, Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import globalStyles from '../styles/globalStyles';
import typography from '../styles/typography';
import colors from '../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const WalletSelect = () => {
    return (
        <TouchableOpacity style={globalStyles.walletContainer}>
            <Image style={globalStyles.currentWalletIcon} source={require('../assets/images/wallet.png')} />
            <Text style={[typography.MediumInterH6, { color: colors.green08 }]}>Current selected wallet</Text>
            <FontAwesome5 name="caret-down" size={16} color={colors.green08} />
        </TouchableOpacity>
    )
}

export default WalletSelect