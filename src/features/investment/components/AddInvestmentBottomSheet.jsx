import React, { useEffect, useRef } from 'react'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useSnapPoints } from '../../../hooks/useSnapPoints';
import { useDispatch, useSelector } from 'react-redux';
import CustomHandle from '../../../components/CustomHandle';
import { NavigationContainer } from '@react-navigation/native';
import { setAddInvestmentBottomSheetDisplay } from '../services/addInvestmentSlice';
import AddInvestmentNavigator from '../add/AddInvestmentNavigator';

const AddInvestmentBottomSheet = () => {
    const addInvestmentBototmSheetRef = useRef(null);
    const snapPoints = useSnapPoints();
    const dispatch = useDispatch();
    const addInvestmentBottomSheetDisplay = useSelector(state => state.addInvestment.addInvestmentBottomSheetDisplay);
    useEffect(() => {
        if (addInvestmentBottomSheetDisplay == true) {
            addInvestmentBototmSheetRef.current.present();
        }
        else {
            addInvestmentBototmSheetRef.current.dismiss();
        }
    }, [addInvestmentBottomSheetDisplay])
    return (
        <BottomSheetModal
            backdropComponent={BottomSheetBackdrop}
            onDismiss={() => {
                dispatch(setAddInvestmentBottomSheetDisplay(false));
            }}
            ref={addInvestmentBototmSheetRef}
            snapPoints={snapPoints}
            index={2}
            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, opacity: 0 }}
            handleComponent={CustomHandle}
        >
            <NavigationContainer independent={true}>
                <AddInvestmentNavigator />
            </NavigationContainer>
        </BottomSheetModal>
    )
}

export default AddInvestmentBottomSheet