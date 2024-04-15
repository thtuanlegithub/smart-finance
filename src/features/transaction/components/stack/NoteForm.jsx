import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import AddTransactionInputViewHeader from '../AddTransactionInputViewHeader';
import { useNavigation } from '@react-navigation/native';
import typography from '../../../../styles/typography';
import { useDispatch, useSelector } from 'react-redux';
import { setTransactionNote } from '../../services/addTransactionFormSlice';


const NoteForm = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const note = useSelector(state => state.addTransactionForm.note);
    const handleNoteTransaction = (text) => {
        dispatch(setTransactionNote(text));
    }
    return (
        <View style={styles.container}>
            <AddTransactionInputViewHeader title='Add Note'
                onBackPress={() => {
                    navigation.navigate('Add Transaction');
                }} />
            <TextInput
                multiline={true}
                style={[typography.RegularInterH3, { flexWrap: 'wrap', marginHorizontal: 16 }]}
                autoFocus={true}
                value={note}
                onChangeText={(text) => handleNoteTransaction(text)} />
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