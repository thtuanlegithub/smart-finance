import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import StackHeader from '../../../components/StackHeader'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setAddInvestmentBottomSheetDisplay, setAddInvestmentName, setAddInvestmentTimeRangeEnd, setAddInvestmentTimeRangeStart } from '../services/addInvestmentSlice'
import { useNavigation } from '@react-navigation/native'
import MediumTextIconInput from '../../transaction/components/MediumTextIconInput'
import NoOutlinedMediumTextIconInput from '../../transaction/components/NoOutlinedMediumTextIconInput'
import NumericInputHintText from '../../../components/NumericInputHintText'
import CustomTextInput from '../../../components/CustomTextInput'
import W1Button from '../../../components/W1Button'
import ActionSheetSelectTimeRangeAddInvestment from '../components/ActionSheetSelectTimeRangeInvestment'
import SelectInvestmentCategory from '../components/SelectInvestmentCategory'

const AddInvestmentForm = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const actionSheetAddInvestmentTimeRangeRef = useRef();
    const addInvestmentTimeRange = useSelector(state => state.addInvestment.addInvestmentTimeRange);
    const addInvestmentTimeRangeStart = useSelector(state => state.addInvestment.addInvestmentTimeRangeStart);
    const addInvestmentTimeRangeEnd = useSelector(state => state.addInvestment.addInvestmentTimeRangeEnd);
    const addInvestmentName = useSelector(state => state.addInvestment.addInvestmentName);
    const addInvestmentCategory = useSelector(state => state.addInvestment.addInvestmentCategory);
    const addInvestmentNote = useSelector(state => state.addInvestment.addInvestmentNote);
    const [addInvestmentTimeRangeInputDisplay, setAddInvestmentTimeRangeInputDisplay] = useState(null);
    const currentWallet = useSelector(state => state.wallet.currentWallet);
    function handleAddInvestmentTimeRange() {
        if (addInvestmentTimeRange === 'customize') {
            setAddInvestmentTimeRangeInputDisplay(`${addInvestmentTimeRangeStart} - ${addInvestmentTimeRangeEnd}`);
        }
        else {
            if (addInvestmentTimeRange === 'this-week') {
                dispatch(setAddInvestmentTimeRangeStart('25/3/2024'));
                dispatch(setAddInvestmentTimeRangeEnd('31/3/2024'));
            }
            else if (addInvestmentTimeRange === 'this-month') {
                dispatch(setAddInvestmentTimeRangeStart('1/4/2024'));
                dispatch(setAddInvestmentTimeRangeEnd('30/4/2024'));
            }
            else if (addInvestmentTimeRange === 'this-year') {
                dispatch(setAddInvestmentTimeRangeStart('1/1/2024'));
                dispatch(setAddInvestmentTimeRangeEnd('31/12/2024'));
            }
            setAddInvestmentTimeRangeInputDisplay(addInvestmentTimeRange);
        }
    }
    useEffect(() => {
        handleAddInvestmentTimeRange();
    }, [addInvestmentTimeRange, addInvestmentTimeRangeStart, addInvestmentTimeRangeEnd])
    return (
        <View style={{
            flex: 1,
        }}>
            <StackHeader
                backContent={t('close')}
                title={t('add-investment')}
                onBackPress={() => {
                    dispatch(setAddInvestmentBottomSheetDisplay(false));
                }}
            />
            <View style={styles.form}>
                <CustomTextInput
                    value={addInvestmentName}
                    onChangeText={
                        (text) => {
                            dispatch(setAddInvestmentName(text))
                        }}
                    field='investment-name'
                    placeholder='investment-name'
                />
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Select Investment Category")
                }}>
                    <SelectInvestmentCategory
                        category={addInvestmentCategory} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <NumericInputHintText
                        hint='principal'
                        value={0} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        actionSheetAddInvestmentTimeRangeRef.current.setModalVisible(true);
                    }}
                >
                    <MediumTextIconInput
                        value={t(addInvestmentTimeRangeInputDisplay)}
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
                        value={addInvestmentNote}
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
                addInvestmentCategory?.id == 'fixedinvestment'
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
            <ActionSheetSelectTimeRangeAddInvestment
                actionSheetAddInvestmentTimeRangeRef={actionSheetAddInvestmentTimeRangeRef}
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

export default AddInvestmentForm