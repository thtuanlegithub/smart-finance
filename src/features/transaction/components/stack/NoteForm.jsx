import { View, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AddTransactionInputViewHeader from '../AddTransactionInputViewHeader';
import { useNavigation } from '@react-navigation/native';
import typography from '../../../../styles/typography';
import { useDispatch, useSelector } from 'react-redux';
import { setTransactionNote } from '../../services/addTransactionFormSlice';


const NoteForm = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const node = useSelector(state => state.addTransactionForm.note);
    const [localNote, setLocalNote] = useState(node);

    const handleNoteTransaction = () => {
        dispatch(setTransactionNote(localNote));
        navigation.navigate('Add Transaction');
    }

    return (
        <View style={styles.container}>
            <AddTransactionInputViewHeader title='Add Note'
                onBackPress={() => {
                    navigation.navigate('Add Transaction');
                }} />
            <TextInput
                multiline={false}
                style={[typography.RegularInterH3, { flexWrap: 'wrap', marginHorizontal: 16 }]}
                autoFocus={true}
                value={localNote}
                onChangeText={(text) => setLocalNote(text)}
                onSubmitEditing={handleNoteTransaction}/>
        </View >
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