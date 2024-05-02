import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'

const SettingButton = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
            <View style={styles.container}>
                <View style={styles.labelGroup}>
                    <View style={{ width: 24, alignItems: 'center' }}>
                        <FontAwesome5 color={colors.green07} solid name={props.icon} size={20} />
                    </View>
                    <Text style={styles.settingButtonText}>{props.title}</Text>
                </View>
                <FontAwesome5 opacity={0.7} name='chevron-right' size={16} color={colors.green08} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 48,
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        marginBottom: 1,
        flexDirection: 'row',
        paddingHorizontal: 24,
        justifyContent: 'space-between',
    },
    labelGroup: {
        marginLeft: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingButtonText: {
        ...typography.RegularInterH4,
        color: colors.green08,
        marginLeft: 14
    }
})

export default SettingButton