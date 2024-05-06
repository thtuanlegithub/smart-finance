import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import typography from '../../../styles/typography'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useTranslation } from 'react-i18next'
const SignOutButton = (props) => {
    const { t } = useTranslation(); 
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.settingButtonContainer}>
            <FontAwesome5
                name='sign-out-alt' size={20}
                style={{ transform: [{ rotate: '180deg' }], color: colors.red02 }} />
            <Text style={styles.signOutButtonText}>{t('sign-out')}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    settingButtonContainer: {
        height: 48,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    signOutButtonText: {
        marginLeft: 8,
        ...typography.MediumInterH4,
        color: colors.red02,
    }
})


export default SignOutButton