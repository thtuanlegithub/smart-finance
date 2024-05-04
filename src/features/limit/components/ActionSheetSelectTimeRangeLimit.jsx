import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ActionSheet from 'react-native-actions-sheet';
import { clearAddLimitTimeRange, setAddLimitTimeRange, setAddLimitTimeRangeEnd, setAddLimitTimeRangeStart } from '../../limit';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import BottomMenuItem from '../../../components/BottomMenuItem';
import DatePicker from 'react-native-date-picker';
import { formatDate } from '../../../utils/formatDate';

const DISPLAY = true;
const HIDE = false;

const ActionSheetSelectTimeRangeAddLimit = (props) => {

    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [pickDateForStart, setPickDateForStart] = useState(true);

    const dispatch = useDispatch();

    const addLimitTimeRangeStart = useSelector(state => state.addLimit.addLimitTimeRangeStart);
    const addLimitTimeRangeEnd = useSelector(state => state.addLimit.addLimitTimeRangeEnd);

    const handleActionSheetSelectAddLimitTimeRangeDisplay = (action) => {
        props.actionSheetAddLimitTimeRangeRef.current.setModalVisible(action);
    }

    const actionSheetCustomizeAddLimitTimeRangeRef = useRef();
    const handleActionSheetCustomizeAddLimitTimeRangeDisplay = (action) => {
        actionSheetCustomizeAddLimitTimeRangeRef.current.setModalVisible(action);
    }
    const handleAddLimitTimeRangeSelect = (addLimitTimeRange) => {
        if (addLimitTimeRange === 'Customize') {
            dispatch(setAddLimitTimeRange(addLimitTimeRange));
            handleActionSheetCustomizeAddLimitTimeRangeDisplay(DISPLAY);
            handleActionSheetSelectAddLimitTimeRangeDisplay(HIDE);
        }
        else {
            dispatch(setAddLimitTimeRange(addLimitTimeRange));
            handleActionSheetSelectAddLimitTimeRangeDisplay(HIDE);
        }
    }

    return (
        <>
            <ActionSheet ref={props.actionSheetAddLimitTimeRangeRef}>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>Select time range</Text>
                    <BottomMenuItem
                        title='This week'
                        onPress={() => handleAddLimitTimeRangeSelect('This week')} />
                    <BottomMenuItem
                        title='This month'
                        onPress={() => handleAddLimitTimeRangeSelect('This month')} />
                    <BottomMenuItem
                        title='This year'
                        onPress={() => handleAddLimitTimeRangeSelect('This year')} />
                    <BottomMenuItem
                        title='Customize'
                        onPress={() => handleAddLimitTimeRangeSelect('Customize')} />
                    <TouchableOpacity
                        onPress={() => handleActionSheetSelectAddLimitTimeRangeDisplay(HIDE)}
                        style={styles.bottomMenuItemContainer}>
                        <Text style={
                            [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
            <ActionSheet ref={actionSheetCustomizeAddLimitTimeRangeRef}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>Customize time range</Text>
                    <TouchableOpacity onPress={() => {
                        setDatePickerOpen(true);
                        setPickDateForStart(true);
                    }}>
                        {
                            addLimitTimeRangeStart
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>Start date: {addLimitTimeRangeStart}</Text>
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
                            addLimitTimeRangeEnd
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>End date: {addLimitTimeRangeEnd}</Text>
                                :
                                <Text style={[typography.RegularInterH3, { color: colors.green06, padding: 16 }]}>Select end date </Text>
                        }
                    </TouchableOpacity>
                    <View style={[styles.bottomMenuItemContainer, { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 24 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeAddLimitTimeRangeDisplay(HIDE);
                                handleActionSheetSelectAddLimitTimeRangeDisplay(DISPLAY);
                                dispatch(clearAddLimitTimeRange());
                            }}>
                            <Text style={
                                [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeAddLimitTimeRangeDisplay(HIDE);
                                handleActionSheetSelectAddLimitTimeRangeDisplay(HIDE);
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
                                dispatch(setAddLimitTimeRangeStart(formatDate(date)));
                            }
                            else {
                                dispatch(setAddLimitTimeRangeEnd(formatDate(date)));
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

export default ActionSheetSelectTimeRangeAddLimit