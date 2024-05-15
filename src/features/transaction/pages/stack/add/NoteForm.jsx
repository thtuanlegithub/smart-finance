import { View, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import typography from '../../../../../styles/typography';
import { useDispatch, useSelector } from 'react-redux';
import { setTransactionNote } from '../../../services/addTransactionFormSlice';
import AddTransactionInputViewHeader from '../../../components/AddTransactionInputViewHeader';
import { setUpdateTransactionNote } from '../../../services/updateTransactionFormSlice';
import { useTranslation } from 'react-i18next';


const NoteForm = () => {
    const currentTransactionCRUDAction = useSelector(state => state.transaction.currentTransactionCRUDAction);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    var note;
    if (currentTransactionCRUDAction == 'create') {
        note = useSelector(state => state.addTransactionForm.note);
        console.log(">>> create: ", note);

    }
    else if (currentTransactionCRUDAction == 'update') {
        note = useSelector(state => state.updateTransactionForm.note);
        console.log(">>> update: ", note);
    }
    else {
        console.log("??")
    }
    const [localNote, setLocalNote] = useState(note);

    const handleNoteTransaction = () => {
        if (currentTransactionCRUDAction == 'create')
            dispatch(setTransactionNote(localNote));
        else if (currentTransactionCRUDAction == 'update')
            dispatch(setUpdateTransactionNote(localNote));
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <AddTransactionInputViewHeader title={t('add-note')}
                onBackPress={() => {
                    navigation.goBack();
                }} />
            <TextInput
                multiline={false}
                style={[typography.RegularInterH3, { flexWrap: 'wrap', marginHorizontal: 16 }]}
                autoFocus={true}
                value={localNote}
                onChangeText={(text) => setLocalNote(text)}
                onSubmitEditing={handleNoteTransaction} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    navBar: {
        borderTopWidth: 0.5,
        borderColor: colors.gray03,
        flex: 1,
        backgroundColor: 'white',
    }
})

export default NoteForm