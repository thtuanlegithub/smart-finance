import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ActionSheet from 'react-native-actions-sheet';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import BottomMenuItem from '../../../components/BottomMenuItem';
import DatePicker from 'react-native-date-picker';
import { formatDate } from '../../../utils/formatDate';
import { useTranslation } from 'react-i18next';
import { setUpdateInvestmentTimeRange, setUpdateInvestmentTimeRangeEnd, setUpdateInvestmentTimeRangeStart, clearUpdateInvestmentTimeRange } from '../services/updateInvestmentSlice';

const DISPLAY = true;
const HIDE = false;

const ActionSheetSelectTimeRangeUpdateInvestment = (props) => {

    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [pickDateForStart, setPickDateForStart] = useState(true);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const updateInvestmentTimeRangeStart = useSelector(state => state.updateInvestment.updateInvestmentTimeRangeStart);
    const updateInvestmentTimeRangeEnd = useSelector(state => state.updateInvestment.updateInvestmentTimeRangeEnd);

    const handleActionSheetSelectUpdateInvestmentTimeRangeDisplay = (action) => {
        props.actionSheetUpdateInvestmentTimeRangeRef.current.setModalVisible(action);
    }

    const actionSheetCustomizeUpdateInvestmentTimeRangeRef = useRef();
    const handleActionSheetCustomizeUpdateInvestmentTimeRangeDisplay = (action) => {
        actionSheetCustomizeUpdateInvestmentTimeRangeRef.current.setModalVisible(action);
    }
    const handleUpdateInvestmentTimeRangeSelect = (updateInvestmentTimeRange) => {
        if (updateInvestmentTimeRange === 'customize') {
            dispatch(setUpdateInvestmentTimeRange(updateInvestmentTimeRange));
            handleActionSheetCustomizeUpdateInvestmentTimeRangeDisplay(DISPLAY);
            handleActionSheetSelectUpdateInvestmentTimeRangeDisplay(HIDE);
        }
        else {
            dispatch(setUpdateInvestmentTimeRange(updateInvestmentTimeRange));
            handleActionSheetSelectUpdateInvestmentTimeRangeDisplay(HIDE);
        }
    }

    return (
        <>
            <ActionSheet ref={props.actionSheetUpdateInvestmentTimeRangeRef}>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>{t('select-time-range')}</Text>
                    <BottomMenuItem
                        title={t('this-week')}
                        onPress={() => handleUpdateInvestmentTimeRangeSelect('this-week')} />
                    <BottomMenuItem
                        title={t('this-month')}
                        onPress={() => handleUpdateInvestmentTimeRangeSelect(t('this-month'))} />
                    <BottomMenuItem
                        title={t('this-year')}
                        onPress={() => handleUpdateInvestmentTimeRangeSelect(t('this-year'))} />
                    <BottomMenuItem
                        title={t('customize')}
                        onPress={() => handleUpdateInvestmentTimeRangeSelect('customize')} />
                    <TouchableOpacity
                        onPress={() => handleActionSheetSelectUpdateInvestmentTimeRangeDisplay(HIDE)}
                        style={styles.bottomMenuItemContainer}>
                        <Text style={
                            [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>{t('cancel')}</Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
            <ActionSheet ref={actionSheetCustomizeUpdateInvestmentTimeRangeRef}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>{t('select-time-range')}</Text>
                    <TouchableOpacity onPress={() => {
                        setDatePickerOpen(true);
                        setPickDateForStart(true);
                    }}>
                        {
                            updateInvestmentTimeRangeStart
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>{t('start-date')}: {updateInvestmentTimeRangeStart}</Text>
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
                            updateInvestmentTimeRangeEnd
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>{t('end-date')}: {updateInvestmentTimeRangeEnd}</Text>
                                :
                                <Text style={[typography.RegularInterH3, { color: colors.green06, padding: 16 }]}>{t('select-end-date')}</Text>
                        }
                    </TouchableOpacity>
                    <View style={[styles.bottomMenuItemContainer, { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 24 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeUpdateInvestmentTimeRangeDisplay(HIDE);
                                handleActionSheetSelectUpdateInvestmentTimeRangeDisplay(DISPLAY);
                                dispatch(clearUpdateInvestmentTimeRange());
                            }}>
                            <Text style={
                                [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>{t('cancel')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeUpdateInvestmentTimeRangeDisplay(HIDE);
                                handleActionSheetSelectUpdateInvestmentTimeRangeDisplay(HIDE);
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
                                dispatch(setUpdateInvestmentTimeRangeStart(formatDate(date)));
                            }
                            else {
                                dispatch(setUpdateInvestmentTimeRangeEnd(formatDate(date)));
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

export default ActionSheetSelectTimeRangeUpdateInvestment