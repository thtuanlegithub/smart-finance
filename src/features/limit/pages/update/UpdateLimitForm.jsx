import { View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import StackHeader from '../../../../components/StackHeader'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setNavigationGoBack, setUpdateLimitAmount, setUpdateLimitBottomSheetDisplay, setUpdateLimitTimeRange, setUpdateLimitTimeRangeEnd, setUpdateLimitTimeRangeStart } from '../../services/UpdateLimitSlice'
import { useNavigation } from '@react-navigation/native'
import MoneyInput from '../../../../components/MoneyInput'
import SelectCategoryInput from '../../../transaction/components/SelectCategoryInput'
import MediumTextIconInput from '../../../transaction/components/MediumTextIconInput'
import NoOutlinedMediumTextIconInput from '../../../transaction/components/NoOutlinedMediumTextIconInput'
import W1Button from '../../../../components/W1Button'
import ActionSheetSelectTimeRangeUpdateLimit from '../../components/ActionSheetSelectTimeRangeUpdateLimit'
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, format } from 'date-fns';
import LimitBuilder from '../../../../patterns/builder/limit/limitBuilder'
import { updateNewLimit } from '../../services/AddLimitSlice'
import { setDataChange } from '../../../budget'

const UpdateLimitForm = () => {
    const { t } = useTranslation();
    dispatch = useDispatch();
    const navigation = useNavigation();
    const actionSheetUpdateLimitTimeRangeRef = useRef();
    const updateLimitTimeRange = useSelector(state => state.updateLimit.updateLimitTimeRange);
    const updateLimitTimeRangeStart = useSelector(state => state.updateLimit.updateLimitTimeRangeStart);
    const updateLimitTimeRangeEnd = useSelector(state => state.updateLimit.updateLimitTimeRangeEnd);
    const currentWallet = useSelector(state => state.wallet.currentWallet);
    const category_id = useSelector(state => state.addTransactionForm.category_id)
    const amount = useSelector(state => state.updateLimit.updateLimitAmount);
    const limit_id = useSelector(state => state.updateLimit.updateLimitId)
    const dataChange = useSelector(state => state.updateLimit.dataChange)
    const [updateLimitTimeRangeInputDisplay, setUpdateLimitTimeRangeInputDisplay] = useState(null);

    function handleUpdateLimitTimeRange() {
        const now = new Date();
        if (updateLimitTimeRange === 'customize') {
            setUpdateLimitTimeRange(`${updateLimitTimeRangeStart} - ${updateLimitTimeRangeEnd}`);
        }
        else {
            if (updateLimitTimeRange === 'this-week') {
                const start = startOfWeek(now);
                const end = endOfWeek(now);
                dispatch(setUpdateLimitTimeRangeStart(format(start, 'dd/MM/yyyy')));
                dispatch(setUpdateLimitTimeRangeEnd(format(end, 'dd/MM/yyyy')));
            }
            else if (updateLimitTimeRange === 'this-month') {
                const start = startOfMonth(now);
                const end = endOfMonth(now);
                dispatch(setUpdateLimitTimeRangeStart(format(start, 'MM/yyyy')));
                dispatch(setUpdateLimitTimeRangeEnd(format(end, 'MM/yyyy')));
            }
            else if (updateLimitTimeRange === 'this-year') {
                const start = startOfYear(now);
                const end = endOfYear(now);
                dispatch(setUpdateLimitTimeRangeStart(format(start, 'yyyy')));
                dispatch(setUpdateLimitTimeRangeEnd(format(end, 'yyyy')));
            }
            setUpdateLimitTimeRangeInputDisplay(updateLimitTimeRange);
        }
    }
    const handleAmountChange = (amount) => {
        amount = parseInt(amount);
        dispatch(setUpdateLimitAmount(amount));
    }

    const handleSaveLimit = async () => {
        const newLimit = new LimitBuilder()
            .setLimitId(limit_id)
            .setAmount(amount)
            .setCategoryId(category_id)
            .setFromDate(updateLimitTimeRangeStart)
            .setToDate(updateLimitTimeRangeEnd)
            .setWalletId(currentWallet.wallet_id)
            .build();
        await updateNewLimit(limit_id, newLimit);
        dispatch(setUpdateLimitBottomSheetDisplay(false));
        dispatch(setDataChange(!dataChange));
        dispatch(setNavigationGoBack(true));
    }

    useEffect(() => {
        handleUpdateLimitTimeRange();
    }, [updateLimitTimeRange, updateLimitTimeRangeStart, updateLimitTimeRangeEnd])
    return (
        <KeyboardAvoidingView style={{ flex: 1, position: 'relative' }}>
            <StackHeader
                backContent={t('close')}
                title={t('update-limit')}
                onBackPress={() => {
                    dispatch(setUpdateLimitBottomSheetDisplay(false));
                }}
            />
            <View style={{
                backgroundColor: 'white',
                marginTop: 8,
                paddingVertical: 4,
                paddingHorizontal: 16,
                gap: 4,
            }}>
                <TouchableOpacity>
                    <MoneyInput
                        label='amount'
                        onChange={(amount) => handleAmountChange(amount)}
                        value={amount} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Select Limit Category")}
                >
                    <SelectCategoryInput />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        actionSheetUpdateLimitTimeRangeRef.current.setModalVisible(true)
                    }}>
                    <MediumTextIconInput
                        value={t(updateLimitTimeRangeInputDisplay)}
                        field='date'
                        placeholder={t('select-time-range')} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Select Wallet')
                    }}>
                    <NoOutlinedMediumTextIconInput
                        value={currentWallet.wallet_name}
                        field='wallet'
                        placeholder={t('select-wallet')}
                    />
                </TouchableOpacity>
            </View>
            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                paddingBottom: 16,
                paddingHorizontal: 16,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <W1Button title={t('save')}
                    onPress={handleSaveLimit} />
            </View>
            <ActionSheetSelectTimeRangeUpdateLimit
                actionSheetUpdateLimitTimeRangeRef={actionSheetUpdateLimitTimeRangeRef}
            />
        </KeyboardAvoidingView>
    )
}

export default UpdateLimitForm