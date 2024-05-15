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
import { setAddInvestmentTimeRange, setAddInvestmentTimeRangeEnd, setAddInvestmentTimeRangeStart, clearAddInvestmentTimeRange } from '../services/addInvestmentSlice';

const DISPLAY = true;
const HIDE = false;

const ActionSheetSelectTimeRangeAddInvestment = (props) => {

    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [pickDateForStart, setPickDateForStart] = useState(true);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const addInvestmentTimeRangeStart = useSelector(state => state.addInvestment.addInvestmentTimeRangeStart);
    const addInvestmentTimeRangeEnd = useSelector(state => state.addInvestment.addInvestmentTimeRangeEnd);

    const handleActionSheetSelectAddInvestmentTimeRangeDisplay = (action) => {
        props.actionSheetAddInvestmentTimeRangeRef.current.setModalVisible(action);
    }

    const actionSheetCustomizeAddInvestmentTimeRangeRef = useRef();
    const handleActionSheetCustomizeAddInvestmentTimeRangeDisplay = (action) => {
        actionSheetCustomizeAddInvestmentTimeRangeRef.current.setModalVisible(action);
    }
    const handleAddInvestmentTimeRangeSelect = (addInvestmentTimeRange) => {
        if (addInvestmentTimeRange === 'customize') {
            dispatch(setAddInvestmentTimeRange(addInvestmentTimeRange));
            handleActionSheetCustomizeAddInvestmentTimeRangeDisplay(DISPLAY);
            handleActionSheetSelectAddInvestmentTimeRangeDisplay(HIDE);
        }
        else {
            dispatch(setAddInvestmentTimeRange(addInvestmentTimeRange));
            handleActionSheetSelectAddInvestmentTimeRangeDisplay(HIDE);
        }
    }

    return (
        <>
            <ActionSheet ref={props.actionSheetAddInvestmentTimeRangeRef}>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>{t('select-time-range')}</Text>
                    <BottomMenuItem
                        title={t('this-week')}
                        onPress={() => handleAddInvestmentTimeRangeSelect('this-week')} />
                    <BottomMenuItem
                        title={t('this-month')}
                        onPress={() => handleAddInvestmentTimeRangeSelect(t('this-month'))} />
                    <BottomMenuItem
                        title={t('this-year')}
                        onPress={() => handleAddInvestmentTimeRangeSelect(t('this-year'))} />
                    <BottomMenuItem
                        title={t('customize')}
                        onPress={() => handleAddInvestmentTimeRangeSelect('customize')} />
                    <TouchableOpacity
                        onPress={() => handleActionSheetSelectAddInvestmentTimeRangeDisplay(HIDE)}
                        style={styles.bottomMenuItemContainer}>
                        <Text style={
                            [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>{t('cancel')}</Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
            <ActionSheet ref={actionSheetCustomizeAddInvestmentTimeRangeRef}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 }}>
                    <Text style={[typography.RegularInterH3, { color: colors.green09, padding: 16 }]}>{t('select-time-range')}</Text>
                    <TouchableOpacity onPress={() => {
                        setDatePickerOpen(true);
                        setPickDateForStart(true);
                    }}>
                        {
                            addInvestmentTimeRangeStart
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>{t('start-date')}: {addInvestmentTimeRangeStart}</Text>
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
                            addInvestmentTimeRangeEnd
                                ?
                                <Text style={[typography.RegularInterH3, { color: colors.green07, padding: 16 }]}>{t('end-date')}: {addInvestmentTimeRangeEnd}</Text>
                                :
                                <Text style={[typography.RegularInterH3, { color: colors.green06, padding: 16 }]}>{t('select-end-date')}</Text>
                        }
                    </TouchableOpacity>
                    <View style={[styles.bottomMenuItemContainer, { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 24 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeAddInvestmentTimeRangeDisplay(HIDE);
                                handleActionSheetSelectAddInvestmentTimeRangeDisplay(DISPLAY);
                                dispatch(clearAddInvestmentTimeRange());
                            }}>
                            <Text style={
                                [typography.RegularInterH3, { color: colors.red01, padding: 16, marginTop: 16 }]}>{t('cancel')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleActionSheetCustomizeAddInvestmentTimeRangeDisplay(HIDE);
                                handleActionSheetSelectAddInvestmentTimeRangeDisplay(HIDE);
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
                                dispatch(setAddInvestmentTimeRangeStart(formatDate(date)));
                            }
                            else {
                                dispatch(setAddInvestmentTimeRangeEnd(formatDate(date)));
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

export default ActionSheetSelectTimeRangeAddInvestment