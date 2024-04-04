import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CircularProgress from './CircularProgress'
import formatCurrency from '../utils/formatCurrency'
import colors from '../styles/colors'
import typography from '../styles/typography';

const LimitItem = () => {
    return (
        <View style={styles.limitItem}>
            <View style={styles.limitProgress}>
                <CircularProgress subColor={colors.red04} mainColor={colors.red03} textColor={colors.red05} />
            </View>
            <View style={styles.limitInformation}>
                <View>
                    <View style={styles.limitInformationHeader}>
                        <Text style={[typography.MediumInterH4, { color: colors.red05 }]}>Vacations</Text>
                        <View style={styles.tagItem}>
                            <Text style={[typography.MediumInterH6, { color: 'white' }]}>Limit</Text>
                        </View>
                    </View>
                    <Text style={[typography.MediumInterH5, { color: colors.red05 }]}>{formatCurrency(3114000)}/</Text>
                    <Text style={[typography.MediumInterH5, { color: colors.red05 }]}>{formatCurrency(4000000)} VND</Text>
                    <Text style={[typography.RegularInterH6, styles.completedPrediction]}>Goal will be completed on 21st April, 2024</Text>
                </View>
                <View style={styles.moneyLeftGroup}>
                    <Text style={[styles.moneyLeft, typography.MediumInterH5, { color: colors.red05 }]}>{formatCurrency(986000)}</Text>
                    <Text style={[styles.moneyLeft, typography.MediumInterH5, { color: colors.red05 }]}>VND left</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    limitItem: {
        backgroundColor: colors.gray01,
        borderRadius: 8,
        flexDirection: 'row',
        gap: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    limitProgress: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    limitInformation: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    limitInformationHeader: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    tagItem: {
        backgroundColor: colors.red03,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        height: 24,
        // padding: 4,
        paddingHorizontal: 10,
    },
    completedPrediction: {
        width: 170,
        paddingTop: 4,
        color: colors.red05,
    },
    moneyLeftGroup: {
        flex: 1,
        marginHorizontal: -20,
    },
    moneyLeft: {
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
})

export default LimitItem