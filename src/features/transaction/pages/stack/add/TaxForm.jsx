import { View, Text } from 'react-native'
import React from 'react'
import typography from '../../../../../styles/typography';
import colors from '../../../../../styles/colors';
import NumericInputHintText from '../../../../../components/NumericInputHintText';
import NumericInputIcon from '../../../../../components/NumericInputIcon';
import StackHeader from '../../../../../components/StackHeader';
import { useNavigation } from '@react-navigation/native';
import formatCurrency from '../../../../../utils/formatCurrency';
import { Switch } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { setTransactionAmount, setTransactionDependents, setTransactionHasTax, setTransactionInsurance } from '../../../services/addTransactionFormSlice';
import calculatePersonalIncomeTax from '../../../../../utils/calculatePersonalIncomeTax';
import { setUpdateTransactionAmount, setUpdateTransactionDependents, setUpdateTransactionHasTax, setUpdateTransactionInsurance } from '../../../services/updateTransactionFormSlice';
import { useTranslation } from 'react-i18next';

const TaxForm = () => {
    const { t } = useTranslation();
    const currentTransactionCRUDAction = useSelector(state => state.transaction.currentTransactionCRUDAction);
    if (currentTransactionCRUDAction === 'create') {
        var hasTax = useSelector(state => state.addTransactionForm.hasTax);
        var transactionAmount = useSelector(state => state.addTransactionForm.amount);
        var transactionInsurance = useSelector(state => state.addTransactionForm.insurance);
        var transactionDependents = useSelector(state => state.addTransactionForm.dependents);
    }
    else if (currentTransactionCRUDAction === 'update') {
        var hasTax = useSelector(state => state.updateTransactionForm.hasTax);
        var transactionAmount = useSelector(state => state.updateTransactionForm.amount);
        var transactionInsurance = useSelector(state => state.updateTransactionForm.insurance);
        var transactionDependents = useSelector(state => state.updateTransactionForm.dependents);
    }

    const dispatch = useDispatch();
    const toggleSwitch = () => {
        if (currentTransactionCRUDAction === 'create') {
            dispatch(setTransactionHasTax(!hasTax));
        }
        else if (currentTransactionCRUDAction === 'update') {
            dispatch(setUpdateTransactionHasTax(!hasTax));
        }
    }
    const handleSalaryChange = (amount) => {
        amount = parseInt(amount);
        if (currentTransactionCRUDAction === 'create') {
            dispatch(setTransactionAmount(amount));
        }
        else if (currentTransactionCRUDAction === 'update') {
            dispatch(setUpdateTransactionAmount(amount));
        }
    }
    const handleInsuranceChange = (amount) => {
        amount = parseInt(amount);
        if (currentTransactionCRUDAction === 'create') {
            dispatch(setTransactionInsurance(amount));
        }
        else if (currentTransactionCRUDAction === 'update') {
            dispatch(setUpdateTransactionInsurance(amount));
        }
    }
    const handleDependentsChange = (amount) => {
        amount = parseInt(amount);
        if (currentTransactionCRUDAction === 'create') {
            dispatch(setTransactionDependents(amount));
        }
        else if (currentTransactionCRUDAction === 'update') {
            dispatch(setUpdateTransactionDependents(amount));
        }
    }
    const navigation = useNavigation();
    return (
        <View>
            <StackHeader title={t('calculate-tax')}
                onBackPress={() => navigation.goBack()}
            />
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
                }}>{t("have-tax")}</Text>
                <Switch
                    trackColor={{ false: colors.gray03, true: colors.green05 }}
                    thumbColor={hasTax ? 'white' : 'white'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={hasTax}
                />
            </View>
            {
                hasTax
                &&
                <>
                    <View style={{
                        backgroundColor: 'white',
                        paddingHorizontal: 24,
                        paddingBottom: 16,
                        marginTop: 8,
                        gap: 8,
                    }}>
                        <Text style={{
                            ...typography.SemiBoldInterH3,
                            paddingVertical: 8,
                            color: colors.green08,
                        }}>{t("personal-income-tax")}</Text>
                        <NumericInputHintText
                            onChange={handleSalaryChange}
                            value={transactionAmount}
                            hint={t('salary')} />
                        <NumericInputHintText
                            onChange={handleInsuranceChange}
                            value={transactionInsurance}
                            hint={t('other-insurance')} />
                        <NumericInputIcon
                            onChange={handleDependentsChange}
                            value={transactionDependents}
                            field='people'
                            placeholder={t('dependents')} />
                    </View>
                    <View style={{
                        padding: 16,
                        backgroundColor: 'white',
                        marginTop: 8,
                        paddingRight: 48,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: 8,
                    }}>
                        <Text
                            style={{
                                ...typography.RegularInterH3,
                                color: colors.green08,
                            }}>{t('total-tax')}:</Text>
                        <Text style={{
                            ...typography.SemiBoldInterH2,
                            color: colors.green07,
                        }}>{formatCurrency(calculatePersonalIncomeTax(transactionAmount, transactionDependents, transactionInsurance))}</Text>
                    </View>
                </>
            }
        </View >
    )
}

export default TaxForm