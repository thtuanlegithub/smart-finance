import { View } from 'react-native'
import React from 'react'
import CustomHandle from '../../../components/CustomHandle';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useSnapPoints } from '../../../hooks/useSnapPoints';
import AddTransactionInputViewHeader from '../../transaction/components/AddTransactionInputViewHeader';

import { listWallet } from '../../../data/fakeDataListWallet';
import WalletItem from '../../../components/WalletItem';
import { useDispatch } from 'react-redux';
import { setCurrentWallet } from '../../transaction';

const HIDE = false;

const BottomSheetSelectWallet = (props) => {
    const dispatch = useDispatch();
    const snapPoints = useSnapPoints();
    const handleSelectWallet = (wallet) => {
        dispatch(setCurrentWallet(wallet));
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
                {listWallet.map((wallet, index) => {
                    return (
                        <WalletItem
                            onSelect={() => handleSelectWallet(wallet)}
                            key={index}
                            name={wallet.name} />
                    )
                })}
            </View>
        </BottomSheetModal>
    )
}

export default BottomSheetSelectWallet