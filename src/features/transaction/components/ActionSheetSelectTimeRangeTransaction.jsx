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
import { useTranslation } from 'react-i18next'

const DISPLAY = true;
const HIDE = false;

const ActionSheetSelectTimeRangeTransaction = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
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
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>{t('select-time-range')}</Text>
                    <BottomMenuItem
                        title={t('this-week')}
                        onPress={() => handleTransactionTimeRangeSelect('This week')} />
                    <BottomMenuItem
                        title={t('this-month')}
                        onPress={() => handleTransactionTimeRangeSelect('This month')} />
                    <BottomMenuItem
                        title={t('this-year')}
                        onPress={() => handleTransactionTimeRangeSelect('This year')} />
                    <BottomMenuItem
                        title={t('customize')}
                        onPress={() => handleTransactionTimeRangeSelect('Customize')} />
                    <TouchableOpacity
                        onPress={() => handleActionSheetSelectTransactionTimeRangeDisplay(HIDE)}
                        style={styles.bottomMenuItemContainer}>
                        <Text style={
                            [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>{t('cancel')}</Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
            <ActionSheet ref={actionSheetCustomizeTransactionTimeRangeRef}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>{t('customize-time-range')}</Text>
                    <TouchableOpacity onPress={() => {
                        setDatePickerOpen(true);
                        setPickDateForStart(true);
                    }}>
                        {
                            transactionTimeRangeStart
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>{t('start-date')}: {transactionTimeRangeStart}</Text>
                                :
                                <Text style={[typography.RegularInterH3, { color: colors.green06, padding: 16 }]}>{t('select-start-date')}</Text>
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
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>{t('end-date')}: {transactionTimeRangeEnd}</Text>
                                :
                                <Text style={[typography.RegularInterH3, { color: colors.green06, padding: 16 }]}>{t('select-end-date')}</Text>
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
                                [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>{t('cancel')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeTransactionTimeRangeDisplay(HIDE);
                                handleActionSheetSelectTransactionTimeRangeDisplay(HIDE);
                            }}>
                            <Text style={
                                [typography.RegularInterH3, { color: colors.green07, padding: 16, marginTop: 16 }]}>{t('confirm')}</Text>
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