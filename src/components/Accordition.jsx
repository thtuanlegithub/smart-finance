import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import typography from '../styles/typography';
import colors from '../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import inputIcons from '../data/inputIcons';
import { TextInput } from 'react-native-gesture-handler';
import TaxForm from '../features/transaction/pages/stack/add/TaxForm';
const Accordition = (props) => {
    const [isFocused, setFocus] = useState(false);
    return (
        <>
            <View style={styles.container}>
                <View style={styles.labelGroup}>
                    <FontAwesome5 name={props.field} size={18} color={colors.green08} style={styles.labelIcon} />
                </View>
                <TouchableOpacity
                    onPress={() => setFocus(!isFocused)}
                    style={styles.inputGroup}>
                    {props.value
                        ?
                        <Text style={[typography.RegularInterH5, { color: colors.green08 }]}>{props.value}</Text>
                        :
                        <Text style={[typography.RegularInterH5, { color: colors.green08, opacity: 0.5 }]}>{props.placeholder}</Text>
                    }
                    {
                        isFocused
                            ?
                            <FontAwesome5 name="chevron-up" size={16} color={colors.green08} opacity={0.5} />
                            :
                            <FontAwesome5 name="chevron-down" size={16} color={colors.green08} opacity={0.5} />
                    }
                </TouchableOpacity>
            </View>
            {
                isFocused
                &&
                <TaxForm />
            }
        </>
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
        borderBottomWidth: 0.5,
        borderColor: colors.green08,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

export default Accordition