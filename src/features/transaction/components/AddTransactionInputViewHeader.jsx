import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const AddTransactionInputViewHeader = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.back} onPress={props.onBackPress}>
                <FontAwesome5 name='chevron-left' size={16} color='black' style={{ alignSelf: 'center', marginTop: 8 }} />
                <Text style={[typography.RegularInterH4, { color: 'black', marginTop: 4, marginLeft: 8 }]}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItem: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        position: 'relative',
    },
    back: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        zIndex: 1,
    },
    title: {
        position: 'absolute',
        ...typography.MediumInterH4,
        color: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        padding: 14,
        flex: 1,
        left: 0,
        right: 0,
        top: 4,
    }
})

export default AddTransactionInputViewHeader