import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import StackHeader from '../../../../components/StackHeader'
import { useDispatch, useSelector } from 'react-redux'
import { setAddLimitAmount, setAddLimitBottomSheetDisplay, setAddLimitTimeRangeEnd, setAddLimitTimeRangeStart, updateNewLimit } from '../../services/AddLimitSlice'
import SelectCategoryInput from '../../../transaction/components/SelectCategoryInput'
import MoneyInput from '../../../../components/MoneyInput'
import MediumTextIconInput from '../../../transaction/components/MediumTextIconInput'
import NoOutlinedMediumTextIconInput from '../../../transaction/components/NoOutlinedMediumTextIconInput'
import W1Button from '../../../../components/W1Button'
import { useNavigation } from '@react-navigation/native'
import ActionSheetSelectTimeRangeAddLimit from '../../components/ActionSheetSelectTimeRangeAddLimit'
import { useTranslation } from 'react-i18next'
import { setCurrentCategory } from '../../../category/services/categorySlice'
import { setTransactionCategory, setUpdateTransactionCategory } from '../../../transaction'
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, format } from 'date-fns';
import LimitBuilder from '../../../../patterns/builder/limit/limitBuilder'
import { setDataChange } from '../../../budget'

const AddLimitForm = () => {
    const { t } = useTranslation();
    dispatch = useDispatch();
    const navigation = useNavigation();
    const actionSheetAddLimitTimeRangeRef = useRef();
    const addLimitTimeRange = useSelector(state => state.addLimit.addLimitTimeRange);
    const addLimitTimeRangeStart = useSelector(state => state.addLimit.addLimitTimeRangeStart);
    const addLimitTimeRangeEnd = useSelector(state => state.addLimit.addLimitTimeRangeEnd);
    const currentWallet = useSelector(state => state.wallet.currentWallet);
    const category_id = useSelector(state => state.addTransactionForm.category_id)
    const amount = useSelector(state => state.addLimit.addLimitAmount);
    const dataChange = useSelector(state => state.addLimit.dataChange)
    const [addLimitTimeRangeInputDisplay, setAddLimitTimeRangeInputDisplay] = useState(null);

    function handleAddLimitTimeRange() {
        const now = new Date();
        if (addLimitTimeRange === 'customize') {
            setAddLimitTimeRangeInputDisplay(`${addLimitTimeRangeStart} - ${addLimitTimeRangeEnd}`);
        }
        else {
            if (addLimitTimeRange === 'this-week') {
                const start = startOfWeek(now);
                const end = endOfWeek(now);
                dispatch(setAddLimitTimeRangeStart(format(start, 'dd/MM/yyyy')));
                dispatch(setAddLimitTimeRangeEnd(format(end, 'dd/MM/yyyy')));
            }
            else if (addLimitTimeRange === 'this-month') {
                const start = startOfMonth(now);
                const end = endOfMonth(now);
                dispatch(setAddLimitTimeRangeStart(format(start, 'MM/yyyy')));
                dispatch(setAddLimitTimeRangeEnd(format(end, 'MM/yyyy')));
            }
            else if (addLimitTimeRange === 'this-year') {
                const start = startOfYear(now);
                const end = endOfYear(now);
                dispatch(setAddLimitTimeRangeStart(format(start, 'yyyy')));
                dispatch(setAddLimitTimeRangeEnd(format(end, 'yyyy')));
            }
            setAddLimitTimeRangeInputDisplay(addLimitTimeRange);
        }
    }

    const handleAmountChange = (amount) => {
        amount = parseInt(amount);
        dispatch(setAddLimitAmount(amount));
    }

    const handleSaveLimit = async () => {
        if (amount <= 0) {
            alert('Amount must be greater than 0');
            return;
        }
        const newLimit = new LimitBuilder()
            .setAmount(amount)
            .setCategoryId(category_id)
            .setFromDate(addLimitTimeRangeStart)
            .setToDate(addLimitTimeRangeEnd)
            .setWalletId(currentWallet.wallet_id)
            .build();
        await updateNewLimit('', newLimit);
        dispatch(setAddLimitBottomSheetDisplay(false));
        dispatch(setDataChange(!dataChange));
    }

    useEffect(() => {
        handleAddLimitTimeRange();
    }, [addLimitTimeRange, addLimitTimeRangeStart, addLimitTimeRangeEnd])

    return (
        <KeyboardAvoidingView style={{ flex: 1, position: 'relative' }}>
            <StackHeader
                backContent={t('close')}
                title={t('add-limit')}
                onBackPress={() => {
                    dispatch(setAddLimitBottomSheetDisplay(false));
                    dispatch(setCurrentCategory(null));
                    dispatch(setTransactionCategory(null));
                    dispatch(setUpdateTransactionCategory(null));
                }} />
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
                        actionSheetAddLimitTimeRangeRef.current.setModalVisible(true)
                    }}>
                    <MediumTextIconInput
                        value={t(addLimitTimeRangeInputDisplay)}
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
            <ActionSheetSelectTimeRangeAddLimit
                actionSheetAddLimitTimeRangeRef={actionSheetAddLimitTimeRangeRef}
            />
        </KeyboardAvoidingView>
    )
}

export default AddLimitForm