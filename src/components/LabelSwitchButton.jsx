import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import colors from '../styles/colors'
import typography from '../styles/typography';
const WEEK = true;
const MONTH = false;
const LabelSwitchButton = () => {
    const [toggleStatus, setToggleStatus] = useState(WEEK);

    return (
        <View style={styles.container}>
            {toggleStatus ?
                <>
                    <View style={styles.toggleButtonActive}>
                        <Text style={[typography.MediumInterH4, styles.toggleTextActive]}>Week</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => setToggleStatus(MONTH)}>
                        <View style={styles.toggleButtonInactive} >
                            <Text style={styles.toggleTextInactive}>Month</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </>
                :
                <>
                    <TouchableWithoutFeedback onPress={() => setToggleStatus(WEEK)}>
                        <View style={styles.toggleButtonInactive} >
                            <Text style={styles.toggleTextInactive}>Week</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.toggleButtonActive}>
                        <Text style={[typography.MediumInterH4, styles.toggleTextActive]}>Month</Text>
                    </View>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        backgroundColor: colors.gray02,
        borderRadius: 10,
        flexDirection: 'row',
        padding: 3
    },
    toggleButtonActive: {
        // opacity: 1,
        // margin: 3,
        backgroundColor: 'white',
        borderRadius: 7,
        height: 34,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    toggleButtonInactive: {
        // opacity: 1,
        borderRadius: 7,
        height: 34,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    toggleTextActive: {
        color: colors.green07
    },
    toggleTextInactive: {
        color: colors.gray03
    }
})

export default LabelSwitchButton