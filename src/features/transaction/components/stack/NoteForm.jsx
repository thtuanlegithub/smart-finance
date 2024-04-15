import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import AddTransactionInputViewHeader from '../AddTransactionInputViewHeader';
import { useNavigation } from '@react-navigation/native';
import typography from '../../../../styles/typography';


const NoteForm = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <AddTransactionInputViewHeader title='Add Note'
                onBackPress={() => {
                    navigation.goBack();
                }} />
            <TextInput
                multiline={true}
                style={[typography.RegularInterH3, { flexWrap: 'wrap', marginHorizontal: 16 }]}
                autoFocus={true}>

            </TextInput>
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