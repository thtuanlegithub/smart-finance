import { View, Text } from 'react-native'
import React from 'react'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useSnapPoints } from '../../../hooks/useSnapPoints'
import CustomHandle from '../../../components/CustomHandle'
import { NavigationContainer } from '@react-navigation/native'
import UpdateTransactionNavigator from '../pages/stack/update/UpdateTransactionNavigator'
import { setDisplayUpdateTransactionModal } from '../services/updateTransactionFormSlice'
import { useDispatch } from 'react-redux'

const UpdateTransactionBottomSheet = (props) => {
    const snapPoints = useSnapPoints();
    const dispatch = useDispatch();
    return (
        <BottomSheetModal
            backdropComponent={BottomSheetBackdrop}
            snapPoints={snapPoints}
            onDismiss={() => dispatch(setDisplayUpdateTransactionModal(false))}
            ref={props.updateTransactionBottomSheetRef}
            index={2}
            style={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                opacity: 0
            }}
            handleComponent={CustomHandle} // Use the custom handle
        >
            <NavigationContainer independent={true}>
                <UpdateTransactionNavigator />
            </NavigationContainer>
        </BottomSheetModal>
    )
}

export default UpdateTransactionBottomSheet