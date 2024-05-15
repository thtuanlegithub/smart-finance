import { View, Text } from 'react-native'
import React from 'react'
import StackHeader from '../../../components/StackHeader'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { setAddInvestmentNote } from '../services/addInvestmentSlice'
import { useNavigation } from '@react-navigation/native'

const InvestmentNoteForm = () => {
    const { t } = useTranslation();
    const addInvestmentNote = useSelector(state => state.addInvestment.addInvestmentNote);
    const dispatch = useDispatch();
    const navigation = useNavigation();
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
                    enablesReturnKeyAutomatically={true}
                    value={addInvestmentNote}
                    onChangeText={(text) => {
                        dispatch(setAddInvestmentNote(text));
                    }}
                    placeholderTextColor={'#BDBDBD'}
                    placeholder={t('enter-note')}
                    multiline={false}
                    onSubmitEditing={() => {
                        navigation.goBack();
                    }
                    }
                />
            </View>
        </View>
    )
}

export default InvestmentNoteForm