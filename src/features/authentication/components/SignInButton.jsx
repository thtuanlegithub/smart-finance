import { Text, TouchableHighlight, StyleSheet } from 'react-native'
import React from 'react'

const SignInButton = (props) => {
    return (
        <TouchableHighlight
            style={styles.signInButton}
            onPress={props.onPress}
            underlayColor="#456B58">
            <Text style={styles.signInButtonTitle}>{props.title}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    signInButton: {
        backgroundColor: '#365545',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        padding: 14,
        marginHorizontal: 16,
    },
    signInButtonTitle: {
        color: 'white',
        fontSize: 14,
    }
})

export default SignInButton;