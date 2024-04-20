import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'
import BottomMenuItem from '../../../components/BottomMenuItem'
import ActionSheet from 'react-native-actions-sheet'
import { useDispatch, useSelector } from 'react-redux'
import { clearTransactionTimeRange, setTransactionTimeRangeEnd, setTransactionTimeRangeStart } from '../services/transactionSlice'
import DatePicker from 'react-native-date-picker'
import { formatDate } from '../../../utils/formatDate'

const DISPLAY = true;
const HIDE = false;

const ActionSheetSelectTimeRangeTransaction = (props) => {
    const dispatch = useDispatch();
    const transactionTimeRangeStart = useSelector(state => state.transaction.transactionTimeRangeStart);
    const transactionTimeRangeEnd = useSelector(state => state.transaction.transactionTimeRangeEnd);

    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [pickDateForStart, setPickDateForStart] = useState(true);

    const handleActionSheetSelectTransactionTimeRangeDisplay = (action) => {
        props.actionSheetTransactionTimeRangeRef.current.setModalVisible(action);
    }

    const actionSheetCustomizeTransactionTimeRangeRef = useRef(null);
    const handleActionSheetCustomizeTransactionTimeRangeDisplay = (action) => {
        actionSheetCustomizeTransactionTimeRangeRef.current.setModalVisible(action);
    }


    const handleTransactionTimeRangeSelect = (transactionTimeRange) => {
        if (transactionTimeRange === 'Customize') {
            handleActionSheetCustomizeTransactionTimeRangeDisplay(DISPLAY);
            handleActionSheetSelectTransactionTimeRangeDisplay(HIDE);
        }
        else {
            dispatch(clearTransactionTimeRange());
            handleActionSheetSelectTransactionTimeRangeDisplay(HIDE);
        }
    }
    return (
        <>
            <ActionSheet ref={props.actionSheetTransactionTimeRangeRef}>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>Select time range</Text>
                    <BottomMenuItem
                        title='This week'
                        onPress={() => handleTransactionTimeRangeSelect('This week')} />
                    <BottomMenuItem
                        title='This month'
                        onPress={() => handleTransactionTimeRangeSelect('This month')} />
                    <BottomMenuItem
                        title='This year'
                        onPress={() => handleTransactionTimeRangeSelect('This year')} />
                    <BottomMenuItem
                        title='Customize'
                        onPress={() => handleTransactionTimeRangeSelect('Customize')} />
                    <TouchableOpacity
                        onPress={() => handleActionSheetSelectTransactionTimeRangeDisplay(HIDE)}
                        style={styles.bottomMenuItemContainer}>
                        <Text style={
                            [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
            <ActionSheet ref={actionSheetCustomizeTransactionTimeRangeRef}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>Customize time range</Text>
                    <TouchableOpacity onPress={() => {
                        setDatePickerOpen(true);
                        setPickDateForStart(true);
                    }}>
                        {
                            transactionTimeRangeStart
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>Start date: {transactionTimeRangeStart}</Text>
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
                            transactionTimeRangeEnd
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>End date: {transactionTimeRangeEnd}</Text>
                                :
                                <Text style={[typography.RegularInterH3, { color: colors.green06, padding: 16 }]}>Select end date </Text>
                        }
                    </TouchableOpacity>
                    <View style={[styles.bottomMenuItemContainer, { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 24 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeTransactionTimeRangeDisplay(HIDE);
                                handleActionSheetSelectTransactionTimeRangeDisplay(DISPLAY);
                                dispatch(clearTransactionTimeRange());
                            }}>
                            <Text style={
                                [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeTransactionTimeRangeDisplay(HIDE);
                                handleActionSheetSelectTransactionTimeRangeDisplay(HIDE);
                            }}>
                            <Text style={
                                [typography.RegularInterH3, { color: colors.green07, padding: 16, marginTop: 16 }]}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <DatePicker
                    mode='date'
                    modal
                    open={datePickerOpen}
                    date={new Date()}
                    onConfirm={(date) => {
                        if (pickDateForStart) {
                            dispatch(setTransactionTimeRangeStart(formatDate(date)));
                        }
                        else {
                            dispatch(setTransactionTimeRangeEnd(formatDate(date)));
                        }
                        setDatePickerOpen(false)
                    }}
                    onCancel={() => {
                        setDatePickerOpen(false)
                    }}
                />
            </ActionSheet>
        </>
    )
}

export default ActionSheetSelectTimeRangeTransaction