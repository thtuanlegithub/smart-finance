import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import StackHeader from '../../../components/StackHeader';
import W1Button from '../../../components/W1Button';
import { addNewWallet, createUserWallet, updateUserWallet } from '../services/walletSlice';
import { getCurrentUser } from '../../authentication';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const AddWallet = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [walletName, setWalletName] = useState('');
    const handleAddNewWallet = async () => {
        const accountId = getCurrentUser().uid;
        const newWallet = createUserWallet(accountId, walletName, false);
        const updatedWallet = await updateUserWallet('', newWallet);
        dispatch(addNewWallet(updatedWallet));
        navigation.goBack();
    }
    return (
        <View style={{
            flex: 1,
        }}>
            <StackHeader title={t('new-wallet')}
                onBackPress={() => {
                    navigation.goBack();
                }}
            />
            <TextInput
                placeholder={t('enter-wallet-name')}
                value={walletName}
                onChangeText={(text) => setWalletName(text)}
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
                    title={t('save')} />
            </View>
        </View>
    )
}

export default AddWallet