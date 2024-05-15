import React, { useEffect, useRef } from 'react'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useSnapPoints } from '../../../hooks/useSnapPoints';
import { useDispatch, useSelector } from 'react-redux';
import CustomHandle from '../../../components/CustomHandle';
import { NavigationContainer } from '@react-navigation/native';
import { setUpdateInvestmentBottomSheetDisplay } from '../services/updateInvestmentSlice';
import UpdateInvestmentNavigator from '../update/UpdateInvestmentNavigator';

const UpdateInvestmentBottomSheet = () => {
    const updateInvestmentBototmSheetRef = useRef(null);
    const snapPoints = useSnapPoints();
    const dispatch = useDispatch();
    const updateInvestmentBottomSheetDisplay = useSelector(state => state.updateInvestment.updateInvestmentBottomSheetDisplay);
    useEffect(() => {
        if (updateInvestmentBottomSheetDisplay == true) {
            updateInvestmentBototmSheetRef.current.present();
        }
        else {
            updateInvestmentBototmSheetRef.current.dismiss();
        }
    }, [updateInvestmentBottomSheetDisplay])
    return (
        <BottomSheetModal
            backdropComponent={BottomSheetBackdrop}
            onDismiss={() => {
                dispatch(setUpdateInvestmentBottomSheetDisplay(false));
            }}
            ref={updateInvestmentBototmSheetRef}
            snapPoints={snapPoints}
            index={2}
            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, opacity: 0 }}
            handleComponent={CustomHandle}
        >
            <NavigationContainer independent={true}>
                <UpdateInvestmentNavigator />
            </NavigationContainer>
        </BottomSheetModal>
    )
}

export default UpdateInvestmentBottomSheet