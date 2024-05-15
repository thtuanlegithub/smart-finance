import { View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import StackHeader from '../../../../components/StackHeader'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setUpdateLimitBottomSheetDisplay, setUpdateLimitTimeRangeEnd, setUpdateLimitTimeRangeStart } from '../../services/UpdateLimitSlice'
import { useNavigation } from '@react-navigation/native'
import MoneyInput from '../../../../components/MoneyInput'
import SelectCategoryInput from '../../../transaction/components/SelectCategoryInput'
import MediumTextIconInput from '../../../transaction/components/MediumTextIconInput'
import NoOutlinedMediumTextIconInput from '../../../transaction/components/NoOutlinedMediumTextIconInput'
import W1Button from '../../../../components/W1Button'
import ActionSheetSelectTimeRangeUpdateLimit from '../../components/ActionSheetSelectTimeRangeUpdateLimit'

const UpdateLimitForm = () => {
    const { t } = useTranslation();
    dispatch = useDispatch();
    const navigation = useNavigation();
    const actionSheetUpdateLimitTimeRangeRef = useRef();
    const updateLimitTimeRange = useSelector(state => state.updateLimit.updateLimitTimeRange);
    const updateLimitTimeRangeStart = useSelector(state => state.updateLimit.updateLimitTimeRangeStart);
    const updateLimitTimeRangeEnd = useSelector(state => state.updateLimit.updateLimitTimeRangeEnd);
    const currentWallet = useSelector(state => state.wallet.currentWallet);
    const [updateLimitTimeRangeInputDisplay, setUpdateLimitTimeRangeInputDisplay] = useState(null);
    function handleUpdateLimitTimeRange() {
        if (updateLimitTimeRange === 'customize') {
            setUpdateLimitTimeRangeInputDisplay(`${updateLimitTimeRangeStart} - ${updateLimitTimeRangeEnd}`);
        }
        else {
            if (updateLimitTimeRange === 'this-week') {
                dispatch(setUpdateLimitTimeRangeStart('25/3/2024'));
                dispatch(setUpdateLimitTimeRangeEnd('31/3/2024'));
            }
            else if (updateLimitTimeRange === 'this-month') {
                dispatch(setUpdateLimitTimeRangeStart('1/4/2024'));
                dispatch(setUpdateLimitTimeRangeEnd('30/4/2024'));
            }
            else if (updateLimitTimeRange === 'this-year') {
                dispatch(setUpdateLimitTimeRangeStart('1/1/2024'));
                dispatch(setUpdateLimitTimeRangeEnd('31/12/2024'));
            }
            setUpdateLimitTimeRangeInputDisplay(updateLimitTimeRange);
        }
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
                        value={0} />
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
                <W1Button title={t('save')} />
            </View>
            <ActionSheetSelectTimeRangeUpdateLimit
                actionSheetUpdateLimitTimeRangeRef={actionSheetUpdateLimitTimeRangeRef}
            />
        </KeyboardAvoidingView>
    )
}

export default UpdateLimitForm