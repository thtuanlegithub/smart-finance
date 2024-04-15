import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import typography from '../styles/typography'
import colors from '../styles/colors'

const BottomMenuItem = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.content}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        ...typography.MediumInterH3,
        color: colors.green07
    }
})


export default BottomMenuItem