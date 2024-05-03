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

const TaxForm = () => {
    const hasTax = useSelector(state => state.addTransactionForm.hasTax);
    const transactionAmount = useSelector(state => state.addTransactionForm.amount);
    const transactionInsurance = useSelector(state => state.addTransactionForm.insurance);
    const transactionDependents = useSelector(state => state.addTransactionForm.dependents);
    const dispatch = useDispatch();
    const toggleSwitch = () => {
        dispatch(setTransactionHasTax(!hasTax));
    }
    const handleSalaryChange = (amount) => {
        amount = parseInt(amount);
        dispatch(setTransactionAmount(amount));
    }
    const handleInsuranceChange = (amount) => {
        amount = parseInt(amount);
        dispatch(setTransactionInsurance(amount));
    }
    const handleDependentsChange = (amount) => {
        amount = parseInt(amount);
        dispatch(setTransactionDependents(amount));
    }
    const navigation = useNavigation();
    return (
        <View>
            <StackHeader title='Calculate Tax'
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
                }}>Have Tax</Text>
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
                        }}>Personal income tax</Text>
                        <NumericInputHintText
                            onChange={handleSalaryChange}
                            value={transactionAmount}
                            hint='Salary' />
                        <NumericInputHintText
                            onChange={handleInsuranceChange}
                            value={transactionInsurance}
                            hint='Social Insurance' />
                        <NumericInputIcon
                            onChange={handleDependentsChange}
                            value={transactionDependents}
                            field='people'
                            placeholder='Dependents' />
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
                            }}>Total tax:</Text>
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