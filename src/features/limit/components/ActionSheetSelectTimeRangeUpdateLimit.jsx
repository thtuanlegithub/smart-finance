import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ActionSheet from 'react-native-actions-sheet';
import { clearUpdateLimitTimeRange, setUpdateLimitTimeRange, setUpdateLimitTimeRangeEnd, setUpdateLimitTimeRangeStart } from '../../limit';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import BottomMenuItem from '../../../components/BottomMenuItem';
import DatePicker from 'react-native-date-picker';
import { formatDate } from '../../../utils/formatDate';
import { useTranslation } from 'react-i18next';

const DISPLAY = true;
const HIDE = false;

const ActionSheetSelectTimeRangeUpdateLimit = (props) => {

    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [pickDateForStart, setPickDateForStart] = useState(true);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const updateLimitTimeRangeStart = useSelector(state => state.updateLimit.updateLimitTimeRangeStart);
    const updateLimitTimeRangeEnd = useSelector(state => state.updateLimit.updateLimitTimeRangeEnd);

    const handleActionSheetSelectUpdateLimitTimeRangeDisplay = (action) => {
        props.actionSheetUpdateLimitTimeRangeRef.current.setModalVisible(action);
    }

    const actionSheetCustomizeUpdateLimitTimeRangeRef = useRef();
    const handleActionSheetCustomizeUpdateLimitTimeRangeDisplay = (action) => {
        actionSheetCustomizeUpdateLimitTimeRangeRef.current.setModalVisible(action);
    }
    const handleUpdateLimitTimeRangeSelect = (updateLimitTimeRange) => {
        if (updateLimitTimeRange === 'Customize') {
            dispatch(setUpdateLimitTimeRange(updateLimitTimeRange));
            handleActionSheetCustomizeUpdateLimitTimeRangeDisplay(DISPLAY);
            handleActionSheetSelectUpdateLimitTimeRangeDisplay(HIDE);
        }
        else {
            dispatch(setUpdateLimitTimeRange(updateLimitTimeRange));
            handleActionSheetSelectUpdateLimitTimeRangeDisplay(HIDE);
        }
    }

    return (
        <>
            <ActionSheet ref={props.actionSheetUpdateLimitTimeRangeRef}>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>{t('select-time-range')}</Text>
                    <BottomMenuItem
                        title={t('this-week')}
                        onPress={() => handleUpdateLimitTimeRangeSelect('this-week')} />
                    <BottomMenuItem
                        title={t('this-month')}
                        onPress={() => handleUpdateLimitTimeRangeSelect(t('this-month'))} />
                    <BottomMenuItem
                        title={t('this-year')}
                        onPress={() => handleUpdateLimitTimeRangeSelect(t('this-year'))} />
                    <BottomMenuItem
                        title={t('customize')}
                        onPress={() => handleUpdateLimitTimeRangeSelect('customize')} />
                    <TouchableOpacity
                        onPress={() => handleActionSheetSelectUpdateLimitTimeRangeDisplay(HIDE)}
                        style={styles.bottomMenuItemContainer}>
                        <Text style={
                            [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>{t('cancel')}</Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
            <ActionSheet ref={actionSheetCustomizeUpdateLimitTimeRangeRef}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>{t('select-time-range')}</Text>
                    <TouchableOpacity onPress={() => {
                        setDatePickerOpen(true);
                        setPickDateForStart(true);
                    }}>
                        {
                            updateLimitTimeRangeStart
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>{t('start-date')}: {updateLimitTimeRangeStart}</Text>
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
                            updateLimitTimeRangeEnd
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>{t('end-date')}: {updateLimitTimeRangeEnd}</Text>
                                :
                                <Text style={[typography.RegularInterH3, { color: colors.green06, padding: 16 }]}>{t('select-end-date')}</Text>
                        }
                    </TouchableOpacity>
                    <View style={[styles.bottomMenuItemContainer, { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 24 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeUpdateLimitTimeRangeDisplay(HIDE);
                                handleActionSheetSelectUpdateLimitTimeRangeDisplay(DISPLAY);
                                dispatch(clearUpdateLimitTimeRange());
                            }}>
                            <Text style={
                                [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>{t('cancel')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeUpdateLimitTimeRangeDisplay(HIDE);
                                handleActionSheetSelectUpdateLimitTimeRangeDisplay(HIDE);
                            }}>
                            <Text style={
                                [typography.RegularInterH3, { color: colors.green07, padding: 16, marginTop: 16 }]}>{t('confirm')}</Text>
                        </TouchableOpacity>
                    </View>
                    <DatePicker
                        mode='date'
                        modal
                        open={datePickerOpen}
                        date={new Date()}
                        onConfirm={(date) => {
                            if (pickDateForStart) {
                                dispatch(setUpdateLimitTimeRangeStart(formatDate(date)));
                            }
                            else {
                                dispatch(setUpdateLimitTimeRangeEnd(formatDate(date)));
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

export default ActionSheetSelectTimeRangeUpdateLimit