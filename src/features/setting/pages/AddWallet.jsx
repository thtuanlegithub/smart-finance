import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import StackHeader from '../../../components/StackHeader';
import W1Button from '../../../components/W1Button';

const AddWallet = () => {
    const navigation = useNavigation();
    const handleAddNewWallet = () => {
        // Add new wallet
        navigation.goBack();
    }
    return (
        <View style={{
            flex: 1,
        }}>
            <StackHeader title='Add Wallet'
                onBackPress={() => {
                    navigation.goBack();
                }}
            />
            <TextInput
                placeholder='Enter wallet name'
                style={{
                    margin: 16,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    backgroundColor: 'white'
                }}
            />
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 16,
                position: 'absolute',
                bottom: 32,
                left: 0,
                right: 0,
            }}>
                <W1Button
                    onPress={handleAddNewWallet}
                    title='Save' />
            </View>
        </View>
    )
}

export default AddWallet