import React, { useRef } from 'react'
import CustomHandle from '../../../components/CustomHandle';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useSnapPoints } from '../../../hooks/useSnapPoints';
import ExpenseReport from '../pages/stack/Expense/ExpenseReport';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import GeneralReport from '../pages/stack/GeneralReport';
import CategoryDetailReport from './ExpenseReport/CategoryDetailReport';
import IncomeDetailReport from './IncomeReport/IncomeDetailReport';
import IncomeReport from '../pages/stack/Income/IncomeReport';
import TimeRangeDetailReport from './TimeRangeDetailReport';

const HIDE = false;

const ReportStack = createStackNavigator();

const BottomSheetReport = (props) => {

    const snapPoints = useSnapPoints();

    const handleDisplayBottomSheetReport = (action) => {
        if (action == HIDE) {
            props.bottomSheetReportRef.current?.close();
        }
        else {
            props.bottomSheetReportRef.current?.present();
        }
    }
    return (
        <BottomSheetModal
            backdropComponent={BottomSheetBackdrop}
            ref={props.bottomSheetReportRef}
            snapPoints={snapPoints}
            index={2}
            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, opacity: 0, position: 'relative' }}
            handleComponent={CustomHandle}>
            <NavigationContainer independent={true}>
                <ReportStack.Navigator
                    initialRouteName='GeneralReport'
                    screenOptions={{
                        headerShown: false,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        transitionSpec: {
                            open: TransitionSpecs.TransitionIOSSpec,
                            close: TransitionSpecs.TransitionIOSSpec,
                        },
                    }}>
                    <ReportStack.Screen name='ExpenseReport'>
                        {(props) => <ExpenseReport {...props} handleDisplayBottomSheetReport={handleDisplayBottomSheetReport} />}
                    </ReportStack.Screen>
                    <ReportStack.Screen name='IncomeReport'>
                        {(props) => <IncomeReport {...props} handleDisplayBottomSheetReport={handleDisplayBottomSheetReport} />}
                    </ReportStack.Screen>
                    <ReportStack.Screen name='GeneralReport'>
                        {(props) => <GeneralReport {...props} handleDisplayBottomSheetReport={handleDisplayBottomSheetReport} />}
                    </ReportStack.Screen>
                    <ReportStack.Screen name='CategoryDetail'>
                        {(props) => <CategoryDetailReport {...props} />}
                    </ReportStack.Screen>
                    <ReportStack.Screen name='TimeRangeDetail'>
                        {(props) => <TimeRangeDetailReport {...props} />}
                    </ReportStack.Screen>
                </ReportStack.Navigator>
            </NavigationContainer>
        </BottomSheetModal>
    )
}



export default BottomSheetReport