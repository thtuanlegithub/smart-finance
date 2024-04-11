import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import typography from '../styles/typography'
import colors from '../styles/colors'
import formatCurrency from '../utils/formatCurrency'
import removeCommas from '../utils/removeCommas'

const MoneyInput = () => {
    const [isFocused, setFocus] = useState(false);

    const [money, setMoney] = React.useState('0');
    const handleMoneyChange = (text) => {
        if (text.length > 0 && isNaN(removeCommas(text)) == false) {
            setMoney(parseInt(removeCommas(text)).toString());
        }
        else {
            setMoney('0');
        }
    }
    return (
        <View style={styles.transactionInputContainer}>
            <View style={styles.currencyUnitLabelBorder}>
                <Text style={styles.currencyUnitLabel}>VND</Text>
            </View>
            <View style={styles.inputGroup}>
                <Text style={[typography.MediumInterH6, { color: colors.green08 }]}>Amount</Text>
                <TextInput
                    value={formatCurrency(removeCommas(money))}
                    onChangeText={handleMoneyChange}
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

export default MoneyInput