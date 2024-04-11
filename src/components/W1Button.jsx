import { Text, TouchableHighlight, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../styles/colors'
import typography from '../styles/typography'

const W1Button = (props) => {
    return (
        <TouchableHighlight
            style={styles.w1Button}
            onPress={props.onPress}
            underlayColor="#456B58">
            <Text style={styles.w1ButtonTitle}>{props.title}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    w1Button: {
        backgroundColor: colors.green07,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        padding: 14,
        marginHorizontal: 16,
    },
    w1ButtonTitle: {
        ...typography.MediumInterH4,
        color: 'white',
    }
})

export default W1Button;