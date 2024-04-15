import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import inputIcons from '../../../data/inputIcons';
const NoOutlinedMediumTextIconInput = (props) => {
    const [isFilled, setIsFileld] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.labelGroup}>
                <FontAwesome5 name={inputIcons[props.type]} size={18} color={colors.green08} style={styles.labelIcon} />
            </View>
            <View style={styles.inputGroup}>
                {isFilled
                    ?
                    <Text style={[typography.RegularInterH5, { color: colors.green08 }]}>Filled Text</Text>
                    :
                    <Text style={[typography.RegularInterH5, { color: colors.green08, opacity: 0.5 }]}>{props.placeholder}</Text>
                }
                <FontAwesome5 name="chevron-right" size={18} color={colors.green08} opacity={0.5} />
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
        height: 48,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

export default NoOutlinedMediumTextIconInput