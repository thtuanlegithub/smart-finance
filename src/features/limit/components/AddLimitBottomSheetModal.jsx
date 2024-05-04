import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useSnapPoints } from '../../../hooks/useSnapPoints'
import CustomHandle from '../../../components/CustomHandle'
import { NavigationContainer } from '@react-navigation/native'
import AddLimitNavigator from '../pages/add/AddLimitNavigator'
import { useDispatch, useSelector } from 'react-redux'
import { setAddLimitBottomSheetDisplay } from '../services/AddLimitSlice'
const AddLimitBottomSheetModal = (props) => {
    const snapPoints = useSnapPoints();
    const dispatch = useDispatch();
    const addLimitBottomSheetRef = useRef(null);
    const addLimitBottomSheetDisplay = useSelector(state => state.addLimit.addLimitBottomSheetDisplay);
    useEffect(() => {
        if (addLimitBottomSheetDisplay == true) {
            addLimitBottomSheetRef.current.present();
        }
        else {
            addLimitBottomSheetRef.current.dismiss();
        }
    }, [addLimitBottomSheetDisplay]);

    return (
        <BottomSheetModal
            onDismiss={() => { dispatch(setAddLimitBottomSheetDisplay(false)) }}
            ref={addLimitBottomSheetRef}
            backdropComponent={BottomSheetBackdrop}
            snapPoints={snapPoints}
            index={2}
            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, opacity: 0 }}
            handleComponent={CustomHandle}
        >
            <NavigationContainer independent={true}>
                <AddLimitNavigator />
            </NavigationContainer>
        </BottomSheetModal>
    )
}

export default AddLimitBottomSheetModal