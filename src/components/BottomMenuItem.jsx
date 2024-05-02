import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import typography from '../styles/typography'
import colors from '../styles/colors'

const BottomMenuItem = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.bottomMenuItemContainer} onPress={props.onPress}>
                <Text style={styles.content}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        ...typography.MediumInterH3,
        color: colors.green07
    },
    bottomMenuItemContainer: {
        paddingVertical: 16,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})


export default BottomMenuItem