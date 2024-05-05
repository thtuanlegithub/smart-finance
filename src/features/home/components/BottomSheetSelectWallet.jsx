import { View } from 'react-native'
import React from 'react'
import CustomHandle from '../../../components/CustomHandle';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useSnapPoints } from '../../../hooks/useSnapPoints';
import AddTransactionInputViewHeader from '../../transaction/components/AddTransactionInputViewHeader';
import WalletItem from '../../../components/WalletItem';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-actions-sheet';
import { selectWallet } from '../../setting';

const HIDE = false;

const BottomSheetSelectWallet = (props) => {
    const dispatch = useDispatch();
    const snapPoints = useSnapPoints();
    const handleSelectWallet = (wallet) => {
        dispatch(selectWallet(wallet.wallet_id));
        props.bottomSheetSelectWalletRef.current?.close();
    }

    const handleDisplayBottomSheetSelectWallet = (action) => {
        if (action == HIDE) {
            props.bottomSheetSelectWalletRef.current?.close();
        }
        else {
            props.bottomSheetSelectWalletRef.current?.present();
        }
    }

    const userWallet = useSelector(state => state.wallet.wallets);


    return (
        <BottomSheetModal
            backdropComponent={BottomSheetBackdrop}
            ref={props.bottomSheetSelectWalletRef}
            snapPoints={snapPoints}
            index={2}
            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, opacity: 0 }}
            handleComponent={CustomHandle}>
            <AddTransactionInputViewHeader
                backContent='Close'
                title='Select Wallet'
                onBackPress={() => {
                    handleDisplayBottomSheetSelectWallet(HIDE);
                }} />
            <View style={{ marginTop: 10 }}>
                <FlatList
                    data={userWallet}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <WalletItem
                                keyExtractor={(item, index) => index.toString()}
                                onSelect={() => handleSelectWallet(item)}
                                name={item.name} />
                        )
                    }}
                />
            </View>
        </BottomSheetModal>
    )
}

export default BottomSheetSelectWallet