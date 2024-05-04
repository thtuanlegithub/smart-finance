import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import typography from '../styles/typography';
import colors from '../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import inputIcons from '../data/inputIcons';
import { TextInput } from 'react-native-gesture-handler';
import formatCurrency from '../utils/formatCurrency';
import removeCommas from '../utils/removeCommas';
const NumericInputIcon = (props) => {
    const [isFocused, setFocus] = useState(false);
    const [value, setValue] = React.useState(props.value ? parseInt(props.value).toString() : '0');

    const handleValueChange = (text) => {
        let newValue = '0';
        if (text.length > 0 && isNaN(removeCommas(text)) == false) {
            newValue = parseInt(removeCommas(text)).toString();
        }
        setValue(newValue);
        props.onChange(newValue);
    }
    return (
        <View style={styles.container}>
            <View style={styles.labelGroup}>
                <FontAwesome5 name={inputIcons[props.field]} size={18} color={colors.green08} style={styles.labelIcon} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    value={formatCurrency(props.value ? parseInt(props.value).toString() : '0')}
                    onChangeText={handleValueChange}
                    placeholderTextColor={colors.gray03}
                    placeholder={props.placeholder}
                    style={
                        [styles.input,
                        { borderBottomWidth: isFocused ? 1.5 : 0.5 },
                        { paddingVertical: isFocused ? 6 : 7 }]
                    }
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    keyboardType='numeric' />
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
    input: {
        padding: 4,
        borderBottomWidth: 0.5,
        borderColor: colors.green08,
        ...typography.MediumInterH4,
        width: '100%',
    },
    inputGroup: {
        flex: 1,
        // borderBottomWidth: 0.5,
        // borderColor: colors.green08,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

export default NumericInputIcon