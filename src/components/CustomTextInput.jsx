import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
import inputIcons from '../data/inputIcons';
import colors from '../styles/colors';
import typography from '../styles/typography';

const CustomTextInput = (props) => {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <View style={styles.labelGroup}>
                <FontAwesome5 name={inputIcons[props.field]} size={18} color={colors.green08} style={styles.labelIcon} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    value={props.value}
                    onChangeText={props.onChangeText}
                    placeholderTextColor="#A7B7B0"
                    placeholder={t(props.placeholder)}
                    style={[typography.RegularInterH3,
                    {
                        flex: 1,
                        color: colors.green08,
                    }]}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    labelGroup: {
        width: 61,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputGroup: {
        flex: 1,
        borderBottomWidth: 0.5,
        borderColor: colors.green08,
        paddingVertical: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

export default CustomTextInput