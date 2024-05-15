import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import StackHeader from '../../../components/StackHeader'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setUpdateInvestmentBottomSheetDisplay, setUpdateInvestmentName, setUpdateInvestmentTimeRangeEnd, setUpdateInvestmentTimeRangeStart } from '../services/updateInvestmentSlice'
import { useNavigation } from '@react-navigation/native'
import MediumTextIconInput from '../../transaction/components/MediumTextIconInput'
import NoOutlinedMediumTextIconInput from '../../transaction/components/NoOutlinedMediumTextIconInput'
import NumericInputHintText from '../../../components/NumericInputHintText'
import CustomTextInput from '../../../components/CustomTextInput'
import W1Button from '../../../components/W1Button'
import ActionSheetSelectTimeRangeUpdateInvestment from '../components/ActionSheetSelectTimeRangeUpdateInvestment'
import SelectInvestmentCategory from '../components/SelectInvestmentCategory'

const UpdateInvestmentForm = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const actionSheetUpdateInvestmentTimeRangeRef = useRef();
    const updateInvestmentTimeRange = useSelector(state => state.updateInvestment.updateInvestmentTimeRange);
    const updateInvestmentTimeRangeStart = useSelector(state => state.updateInvestment.updateInvestmentTimeRangeStart);
    const updateInvestmentTimeRangeEnd = useSelector(state => state.updateInvestment.updateInvestmentTimeRangeEnd);
    const updateInvestmentName = useSelector(state => state.updateInvestment.updateInvestmentName);
    const updateInvestmentCategory = useSelector(state => state.updateInvestment.updateInvestmentCategory);
    const updateInvestmentNote = useSelector(state => state.updateInvestment.updateInvestmentNote);
    const [updateInvestmentTimeRangeInputDisplay, setUpdateInvestmentTimeRangeInputDisplay] = useState(null);
    const currentWallet = useSelector(state => state.wallet.currentWallet);
    function handleUpdateInvestmentTimeRange() {
        if (updateInvestmentTimeRange === 'customize') {
            setUpdateInvestmentTimeRangeInputDisplay(`${updateInvestmentTimeRangeStart} - ${updateInvestmentTimeRangeEnd}`);
        }
        else {
            if (updateInvestmentTimeRange === 'this-week') {
                dispatch(setUpdateInvestmentTimeRangeStart('25/3/2024'));
                dispatch(setUpdateInvestmentTimeRangeEnd('31/3/2024'));
            }
            else if (updateInvestmentTimeRange === 'this-month') {
                dispatch(setUpdateInvestmentTimeRangeStart('1/4/2024'));
                dispatch(setUpdateInvestmentTimeRangeEnd('30/4/2024'));
            }
            else if (updateInvestmentTimeRange === 'this-year') {
                dispatch(setUpdateInvestmentTimeRangeStart('1/1/2024'));
                dispatch(setUpdateInvestmentTimeRangeEnd('31/12/2024'));
            }
            setUpdateInvestmentTimeRangeInputDisplay(updateInvestmentTimeRange);
        }
    }
    useEffect(() => {
        handleUpdateInvestmentTimeRange();
    }, [updateInvestmentTimeRange, updateInvestmentTimeRangeStart, updateInvestmentTimeRangeEnd])
    return (
        <View style={{
            flex: 1,
        }}>
            <StackHeader
                backContent={t('close')}
                title={t('update-investment')}
                onBackPress={() => {
                    dispatch(setUpdateInvestmentBottomSheetDisplay(false));
                }}
            />
            <View style={styles.form}>
                <CustomTextInput
                    value={updateInvestmentName}
                    onChangeText={
                        (text) => {
                            dispatch(setUpdateInvestmentName(text))
                        }}
                    field='investment-name'
                    placeholder='investment-name'
                />
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Select Investment Category")
                }}>
                    <SelectInvestmentCategory
                        category={updateInvestmentCategory} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <NumericInputHintText
                        hint='principal'
                        value={0} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        actionSheetUpdateInvestmentTimeRangeRef.current.setModalVisible(true);
                    }}
                >
                    <MediumTextIconInput
                        value={t(updateInvestmentTimeRangeInputDisplay)}
                        field='date'
                        placeholder='select-time-range'
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Investment Note')
                    }}>
                    <MediumTextIconInput
                        field='note'
                        placeholder='note'
                        value={updateInvestmentNote}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Select Wallet")
                }}>
                    <NoOutlinedMediumTextIconInput
                        field='wallet'
                        placeholder='select-wallet'
                        value={currentWallet.wallet_name}
                    />
                </TouchableOpacity>
            </View>
            {
                updateInvestmentCategory?.id == 'fixedinvestment'
                &&
                <View style={styles.form}>
                    <TouchableOpacity>
                        <MediumTextIconInput
                            field='circle'
                            placeholder='circle' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <NoOutlinedMediumTextIconInput
                            field='maturity'
                            placeholder='maturity' />
                    </TouchableOpacity>
                </View>
            }
            <View style={{
                position: 'absolute',
                bottom: 0,
                paddingBottom: 16,
                width: '100%',
                paddingHorizontal: 16,
                backgroundColor: '#yourColor',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: colors.gray02,
            }}>
                <W1Button title='Save' />
            </View>
            <ActionSheetSelectTimeRangeUpdateInvestment
                actionSheetUpdateInvestmentTimeRangeRef={actionSheetUpdateInvestmentTimeRangeRef}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 10,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        gap: 8,
    },

})

export default UpdateInvestmentForm