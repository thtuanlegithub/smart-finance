import { View, Text, Switch, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AddTransactionInputViewHeader from '../../../components/AddTransactionInputViewHeader'
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../../../../styles/colors';
import typography from '../../../../../styles/typography';
import { useDispatch, useSelector } from 'react-redux';
import { setTransactionHasReminder, setTransactionReminderDate, setTransactionReminderTime } from '../../../services/addTransactionFormSlice';
import { formatDate } from '../../../../../utils/formatDate';
import formatTime from '../../../../../utils/formatTime';
import { useTranslation } from 'react-i18next';

const ReminderForm = () => {
    const navigation = useNavigation();
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [timePickerOpen, setTimePickerOpen] = useState(false);
    const { t } = useTranslation(); 
    const hasReminder = useSelector(state => state.addTransactionForm.hasReminder);

    const toggleSwitch = () => {
        dispatch(setTransactionHasReminder(!hasReminder));
    }

    const reminderTime = useSelector(state => state.addTransactionForm.reminderTime);
    const reminderDate = useSelector(state => state.addTransactionForm.reminderDate);

    const dispatch = useDispatch();
    return (
        <View>
            <AddTransactionInputViewHeader
                onBackPress={() => navigation.goBack()}
                title={t('reminder')}/>
            <View style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 24,
                paddingVertical: 14,
                marginTop: 10,
                alignItems: 'center',
            }}>
                <Text style={{
                    ...typography.MediumInterH4,
                    color: colors.green07,
                }}>{t('reminder')}</Text>
                <Switch
                    trackColor={{ false: colors.gray03, true: colors.green05 }}
                    thumbColor={hasReminder ? 'white' : 'white'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={hasReminder}
                />
            </View>

            {
                hasReminder
                &&

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: 10,
                    backgroundColor: 'white',
                    paddingVertical: 8,
                }}>
                    <View style={styles.dateTimePickerBtn}>
                        {
                            reminderTime
                                ?
                                <TouchableOpacity
                                    onPress={() => setTimePickerOpen(true)}>
                                    <Text style={styles.dateTimePickerBtnText}>{reminderTime}</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={() => setTimePickerOpen(true)}>
                                    <Text style={styles.dateTimePickerBtnText}>{t('select-time')}</Text>
                                </TouchableOpacity>
                        }

                    </View>
                    <View style={styles.dateTimePickerBtn}>
                        {
                            reminderDate
                                ?
                                <TouchableOpacity
                                    onPress={() => setDatePickerOpen(true)}>
                                    <Text style={styles.dateTimePickerBtnText}>{reminderDate}</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={() => setDatePickerOpen(true)}>
                                    <Text style={styles.dateTimePickerBtnText}>{t('select-date')}</Text>
                                </TouchableOpacity>
                        }
                    </View>
                    <DatePicker
                        mode='date'
                        modal
                        open={datePickerOpen}
                        date={new Date()}
                        onConfirm={(date) => {
                            dispatch(setTransactionReminderDate(formatDate(date)));
                            setDatePickerOpen(false);
                        }}
                        onCancel={() => {
                            setDatePickerOpen(false)
                        }}
                    />
                    <DatePicker
                        mode='time'
                        modal
                        open={timePickerOpen}
                        date={new Date()}
                        onConfirm={(date) => {
                            dispatch(setTransactionReminderTime(formatTime(date)));
                            setTimePickerOpen(false)
                        }}
                        onCancel={() => {
                            setTimePickerOpen(false)
                        }}
                    />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    dateTimePickerBtn: {
        backgroundColor: colors.gray02,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginRight: 10,
    },
    dateTimePickerBtnText: {
        color: colors.green08,
        ...typography.RegularInterH5,
        paddingVertical: 10,
    }
})

export default ReminderForm