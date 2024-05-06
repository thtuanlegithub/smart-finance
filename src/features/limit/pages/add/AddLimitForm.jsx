import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import StackHeader from '../../../../components/StackHeader'
import { useDispatch, useSelector } from 'react-redux'
import { setAddLimitBottomSheetDisplay, setAddLimitTimeRangeEnd, setAddLimitTimeRangeStart } from '../../services/AddLimitSlice'
import SelectCategoryInput from '../../../transaction/components/SelectCategoryInput'
import MoneyInput from '../../../../components/MoneyInput'
import MediumTextIconInput from '../../../transaction/components/MediumTextIconInput'
import NoOutlinedMediumTextIconInput from '../../../transaction/components/NoOutlinedMediumTextIconInput'
import W1Button from '../../../../components/W1Button'
import { useNavigation } from '@react-navigation/native'
import ActionSheetSelectTimeRangeAddLimit from '../../components/ActionSheetSelectTimeRangeLimit'
import { useTranslation } from 'react-i18next'

const AddLimitForm = () => {
    dispatch = useDispatch();
    const navigation = useNavigation();
    const actionSheetAddLimitTimeRangeRef = useRef();
    const addLimitTimeRange = useSelector(state => state.addLimit.addLimitTimeRange);
    const addLimitTimeRangeStart = useSelector(state => state.addLimit.addLimitTimeRangeStart);
    const addLimitTimeRangeEnd = useSelector(state => state.addLimit.addLimitTimeRangeEnd);
    const currentWallet = useSelector(state => state.wallet.currentWallet);
    const [addLimitTimeRangeInputDisplay, setAddLimitTimeRangeInputDisplay] = useState(null);
    const { t } = useTranslation(); 
    function handleAddLimitTimeRange() {
        if (addLimitTimeRange === 'Customize') {
            setAddLimitTimeRangeInputDisplay(`${addLimitTimeRangeStart} - ${addLimitTimeRangeEnd}`);
        }
        else {
            if (addLimitTimeRange === 'This week') {
                dispatch(setAddLimitTimeRangeStart('25/3/2024'));
                dispatch(setAddLimitTimeRangeEnd('31/3/2024'));
            }
            else if (addLimitTimeRange === 'This month') {
                dispatch(setAddLimitTimeRangeStart('1/4/2024'));
                dispatch(setAddLimitTimeRangeEnd('30/4/2024'));
            }
            else if (addLimitTimeRange === 'This year') {
                dispatch(setAddLimitTimeRangeStart('1/1/2024'));
                dispatch(setAddLimitTimeRangeEnd('31/12/2024'));
            }
            setAddLimitTimeRangeInputDisplay(addLimitTimeRange);
        }
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
                }} />
            <View style={{
                backgroundColor: 'white',
                marginTop: 8,
                paddingVertical: 4,
                paddingHorizontal: 16,
                gap: 4,
            }}>
                <TouchableOpacity>
                    <MoneyInput value={0} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Select Category")}
                    >
                    <SelectCategoryInput />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        actionSheetAddLimitTimeRangeRef.current.setModalVisible(true)
                    }}>
                    <MediumTextIconInput
                        value={addLimitTimeRangeInputDisplay}
                        field='date'
                        placeholder={t('select-time-range')}/>
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
            <ActionSheetSelectTimeRangeAddLimit
                actionSheetAddLimitTimeRangeRef={actionSheetAddLimitTimeRangeRef}
            />
        </KeyboardAvoidingView>
    )
}

export default AddLimitForm