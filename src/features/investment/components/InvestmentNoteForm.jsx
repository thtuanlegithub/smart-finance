import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import StackHeader from '../../../components/StackHeader'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { setAddInvestmentNote } from '../services/addInvestmentSlice'
import { useNavigation } from '@react-navigation/native'
import { setUpdateInvestmentNote } from '../services/updateInvestmentSlice'

const InvestmentNoteForm = () => {
    const { t } = useTranslation();
    const currentInvestmentCRUDAction = useSelector(state => state.investment.currentInvestmentCRUDAction);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [investmentNote, setInvestmentNote] = useState('');
    const selectedInvestmentNote = useSelector(state => state.updateInvestment.updateInvestmentNote);
    const currentInvestmentNote = useSelector(state => state.addInvestment.addInvestmentNote);

    useEffect(() => {
        if (currentInvestmentCRUDAction == 'update') {
            if (selectedInvestmentNote != investmentNote) {
                setInvestmentNote(selectedInvestmentNote);
            }
        }
        else if (currentInvestmentCRUDAction == 'add') {
            if (currentInvestmentNote != investmentNote) {
                setInvestmentNote(currentInvestmentNote);
            }
        }
    }, [])
    const handleInvestmentNoteSubmit = () => {
        if (currentInvestmentCRUDAction == 'add') {
            dispatch(setAddInvestmentNote(investmentNote));
        }
        else if (currentInvestmentCRUDAction == 'update') {
            dispatch(setUpdateInvestmentNote(investmentNote));
        }
        navigation.goBack();
    }
    return (
        <View style={{
            flex: 1,
            gap: 10,
        }}>
            <StackHeader
                title={t('investment-note')}
            />
            <View style={{
                backgroundColor: 'white',
                paddingHorizontal: 16,
                flex: 1,
            }}>
                <TextInput
                    value={investmentNote}
                    onChangeText={(text) => {
                        setInvestmentNote(text);
                    }}
                    placeholderTextColor={'#BDBDBD'}
                    placeholder={t('enter-note')}
                    multiline={false}
                    onSubmitEditing={handleInvestmentNoteSubmit}
                />
            </View>
        </View>
    )
}

export default InvestmentNoteForm