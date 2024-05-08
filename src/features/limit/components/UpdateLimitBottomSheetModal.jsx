import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useSnapPoints } from '../../../hooks/useSnapPoints'
import CustomHandle from '../../../components/CustomHandle'
import { NavigationContainer } from '@react-navigation/native'
import UpdateLimitNavigator from '../pages/update/UpdateLimitNavigator'
import { useDispatch, useSelector } from 'react-redux'
import { setUpdateLimitBottomSheetDisplay } from '../services/UpdateLimitSlice'
import { setCurrentCategory } from '../../category/services/categorySlice'
import { setTransactionCategory, setUpdateTransactionCategory } from '../../transaction'
const UpdateLimitBottomSheetModal = (props) => {
    const snapPoints = useSnapPoints();
    const dispatch = useDispatch();
    const updateLimitBottomSheetRef = useRef(null);
    const updateLimitBottomSheetDisplay = useSelector(state => state.updateLimit.updateLimitBottomSheetDisplay);
    useEffect(() => {
        if (updateLimitBottomSheetDisplay == true) {
            updateLimitBottomSheetRef.current.present();
        }
        else {
            updateLimitBottomSheetRef.current.dismiss();
        }
    }, [updateLimitBottomSheetDisplay]);

    return (
        <BottomSheetModal
            onDismiss={() => {
                dispatch(setUpdateLimitBottomSheetDisplay(false))
                dispatch(setCurrentCategory(null));
                dispatch(setTransactionCategory(null));
                dispatch(setUpdateTransactionCategory(null));
            }}
            ref={updateLimitBottomSheetRef}
            backdropComponent={BottomSheetBackdrop}
            snapPoints={snapPoints}
            index={2}
            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, opacity: 0 }}
            handleComponent={CustomHandle}
        >
            <NavigationContainer independent={true}>
                <UpdateLimitNavigator />
            </NavigationContainer>
        </BottomSheetModal>
    )
}

export default UpdateLimitBottomSheetModal