import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ActionSheet from 'react-native-actions-sheet';
import { clearAddLimitTimeRange, setAddLimitTimeRange, setAddLimitTimeRangeEnd, setAddLimitTimeRangeStart } from '..';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import BottomMenuItem from '../../../components/BottomMenuItem';
import DatePicker from 'react-native-date-picker';
import { formatDate } from '../../../utils/formatDate';
import { useTranslation } from 'react-i18next';

const DISPLAY = true;
const HIDE = false;

const ActionSheetSelectTimeRangeAddLimit = (props) => {

    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [pickDateForStart, setPickDateForStart] = useState(true);
    const { t } = useTranslation();
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
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>{t('select-time-range')}</Text>
                    <BottomMenuItem
                        title={t('this-week')}
                        onPress={() => handleAddLimitTimeRangeSelect('this-week')} />
                    <BottomMenuItem
                        title={t('this-month')}
                        onPress={() => handleAddLimitTimeRangeSelect('this-month')} />
                    <BottomMenuItem
                        title={t('this-year')}
                        onPress={() => handleAddLimitTimeRangeSelect('this-year')} />
                    <BottomMenuItem
                        title={t('customize')}
                        onPress={() => handleAddLimitTimeRangeSelect('customize')} />
                    <TouchableOpacity
                        onPress={() => handleActionSheetSelectAddLimitTimeRangeDisplay(HIDE)}
                        style={styles.bottomMenuItemContainer}>
                        <Text style={
                            [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>{t('cancel')}</Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
            <ActionSheet ref={actionSheetCustomizeAddLimitTimeRangeRef}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>{t('select-time-range')}</Text>
                    <TouchableOpacity onPress={() => {
                        setDatePickerOpen(true);
                        setPickDateForStart(true);
                    }}>
                        {
                            addLimitTimeRangeStart
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>{t('start-date')}: {addLimitTimeRangeStart}</Text>
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
                            addLimitTimeRangeEnd
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>{t('end-date')}: {addLimitTimeRangeEnd}</Text>
                                :
                                <Text style={[typography.RegularInterH3, { color: colors.green06, padding: 16 }]}>{t('select-end-date')}</Text>
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
                                [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>{t('cancel')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeAddLimitTimeRangeDisplay(HIDE);
                                handleActionSheetSelectAddLimitTimeRangeDisplay(HIDE);
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