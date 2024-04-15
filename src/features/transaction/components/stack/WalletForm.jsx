import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AddTransactionInputViewHeader from '../AddTransactionInputViewHeader';

const WalletForm = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <AddTransactionInputViewHeader title='Select Wallet'
                onBackPress={() => {
                    navigation.goBack();
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    navBar: {
        borderTopWidth: 0.5,
        borderColor: colors.gray03,
        flex: 1,
        backgroundColor: 'white',
    }
})

export default WalletForm