import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import typography from '../styles/typography'
import colors from '../styles/colors'
import formatCurrency from '../utils/formatCurrency'
import removeCommas from '../utils/removeCommas'
import { useTranslation } from 'react-i18next'

const NumericInputHintText = (props) => {
    const { t } = useTranslation();
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
        <View style={styles.transactionInputContainer}>
            <View style={styles.currencyUnitLabelBorder}>
                <Text style={styles.currencyUnitLabel}>VND</Text>
            </View>
            <View style={styles.inputGroup}>
                <Text style={[typography.MediumInterH6, { color: colors.green08 }]}>{t(props.hint)}</Text>
                <TextInput
                    inputMode='numeric'
                    value={formatCurrency(props.value ? parseInt(props.value).toString() : '0')}
                    onChangeText={handleValueChange}
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
    transactionInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    currencyUnitLabelBorder: {
        width: 60,
        marginTop: 6,
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: colors.green06,
    },
    currencyUnitLabel: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        textAlign: 'center',
        ...typography.MediumInterH4,
        color: colors.green07,
    },
    inputGroup: {
        flex: 1,
    },
    input: {
        padding: 4,
        borderBottomWidth: 0.5,
        borderColor: colors.green08,
        ...typography.MediumInterH3,
    }
})

export default NumericInputHintText