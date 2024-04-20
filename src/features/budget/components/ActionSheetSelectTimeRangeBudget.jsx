import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ActionSheet from 'react-native-actions-sheet';
import { clearBudgetTimeRange, setBudgetTimeRangeEnd, setBudgetTimeRangeStart } from '../services/budgetSlice';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import BottomMenuItem from '../../../components/BottomMenuItem';
import DatePicker from 'react-native-date-picker';
import { formatDate } from '../../../utils/formatDate';

const DISPLAY = true;
const HIDE = false;

const ActionSheetSelectTimeRangeBudget = (props) => {

    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [pickDateForStart, setPickDateForStart] = useState(true);



    const dispatch = useDispatch();

    const budgetTimeRangeStart = useSelector(state => state.budget.budgetTimeRangeStart);
    const budgetTimeRangeEnd = useSelector(state => state.budget.budgetTimeRangeEnd);

    const handleActionSheetSelectBudgetTimeRangeDisplay = (action) => {
        props.actionSheetBudgetTimeRangeRef.current.setModalVisible(action);
    }

    const actionSheetCustomizeBudgetTimeRangeRef = useRef();
    const handleActionSheetCustomizeBudgetTimeRangeDisplay = (action) => {
        actionSheetCustomizeBudgetTimeRangeRef.current.setModalVisible(action);
    }
    const handleBudgetTimeRangeSelect = (budgetTimeRange) => {
        if (budgetTimeRange === 'Customize') {
            handleActionSheetCustomizeBudgetTimeRangeDisplay(DISPLAY);
            handleActionSheetSelectBudgetTimeRangeDisplay(HIDE);
        }
        else {
            dispatch(clearBudgetTimeRange());
            handleActionSheetSelectBudgetTimeRangeDisplay(HIDE);
        }
    }

    return (
        <>
            <ActionSheet ref={props.actionSheetBudgetTimeRangeRef}>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>Select time range</Text>
                    <BottomMenuItem
                        title='This week'
                        onPress={() => handleBudgetTimeRangeSelect('This week')} />
                    <BottomMenuItem
                        title='This month'
                        onPress={() => handleBudgetTimeRangeSelect('This month')} />
                    <BottomMenuItem
                        title='This year'
                        onPress={() => handleBudgetTimeRangeSelect('This year')} />
                    <BottomMenuItem
                        title='Customize'
                        onPress={() => handleBudgetTimeRangeSelect('Customize')} />
                    <TouchableOpacity
                        onPress={() => handleActionSheetSelectBudgetTimeRangeDisplay(HIDE)}
                        style={styles.bottomMenuItemContainer}>
                        <Text style={
                            [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
            <ActionSheet ref={actionSheetCustomizeBudgetTimeRangeRef}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>Customize time range</Text>
                    <TouchableOpacity onPress={() => {
                        setDatePickerOpen(true);
                        setPickDateForStart(true);
                    }}>
                        {
                            budgetTimeRangeStart
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>Start date: {budgetTimeRangeStart}</Text>
                                :
                                <Text style={[typography.RegularInterH3, { color: colors.green06, padding: 16 }]}>Select start date </Text>
                        }
                    </TouchableOpacity>
                    <View style={styles.border}>
                    </View>
                    <TouchableOpacity onPress={() => {
                        setDatePickerOpen(true);
                        setPickDateForStart(false);
                    }}>
                        {
                            budgetTimeRangeEnd
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>End date: {budgetTimeRangeEnd}</Text>
                                :
                                <Text style={[typography.RegularInterH3, { color: colors.green06, padding: 16 }]}>Select end date </Text>
                        }
                    </TouchableOpacity>
                    <View style={[styles.bottomMenuItemContainer, { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 24 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeBudgetTimeRangeDisplay(HIDE);
                                handleActionSheetSelectBudgetTimeRangeDisplay(DISPLAY);
                                dispatch(clearBudgetTimeRange());
                            }}>
                            <Text style={
                                [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeBudgetTimeRangeDisplay(HIDE);
                                handleActionSheetSelectBudgetTimeRangeDisplay(HIDE);
                            }}>
                            <Text style={
                                [typography.RegularInterH3, { color: colors.green07, padding: 16, marginTop: 16 }]}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                    <DatePicker
                        mode='date'
                        modal
                        open={datePickerOpen}
                        date={new Date()}
                        onConfirm={(date) => {
                            if (pickDateForStart) {
                                dispatch(setBudgetTimeRangeStart(formatDate(date)));
                            }
                            else {
                                dispatch(setBudgetTimeRangeEnd(formatDate(date)));
                            }
                            setDatePickerOpen(false)
                        }}
                        onCancel={() => {
                            setDatePickerOpen(false)
                        }}
                    />
                </View>
            </ActionSheet>
        </>
    )
}

export default ActionSheetSelectTimeRangeBudget