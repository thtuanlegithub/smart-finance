import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import StackHeader from '../../../components/StackHeader'
import { useNavigation } from '@react-navigation/native'
import WalletItem from '../../../components/WalletItem'
import { useDispatch, useSelector } from 'react-redux'
import { selectWallet } from '../services/walletSlice'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const SettingWallet = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userWallet = useSelector(state => state.wallet.wallets);
    const handleSelectWallet = (wallet) => {
        dispatch(selectWallet(wallet.wallet_id));
        navigation.goBack();
    }
    const handleSelectAllWallet = () => {
        dispatch(selectWallet(null));
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
            <FlatList
                ListHeaderComponent={
                    <TouchableOpacity
                        onPress={handleSelectAllWallet}
                        style={styles.allWallet}>
                        <FontAwesome5 name='wallet' size={24} color={colors.green07} />
                        <Text style={{
                            ...typography.MediumInterH4,
                            paddingVertical: 16,
                        }}>All wallet</Text>
                    </TouchableOpacity>
                }
                keyExtractor={item => item.wallet_id.toString()}
                data={userWallet}
                renderItem={({ item, index }) => (
                    <WalletItem
                        key={index}
                        onSelect={() => handleSelectWallet(item)}
                        name={item.wallet_name} />
                )} />
            <TouchableOpacity
                onPress={() => navigation.navigate('AddWallet')}
                style={styles.newCategoryContainer}>
                <FontAwesome5 style={{ backgroundColor: colors.green05, paddingHorizontal: 6, paddingVertical: 4, borderRadius: 6 }} name='plus' size={16} color='white' />
                <Text style={[typography.SemiBoldInterH4, { color: colors.green06 }]}>New wallet</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    newCategoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: 'white',
        marginVertical: 14,
        gap: 12,
    },
    allWallet: {
        backgroundColor: 'white',
        marginBottom: 16,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
        paddingHorizontal: 24,
    },
})

export default SettingWallet