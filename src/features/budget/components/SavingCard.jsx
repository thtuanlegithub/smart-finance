import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import formatCurrency from '../../../utils/formatCurrency'
import expenseCategoryIcons from '../../../data/expenseCategoryIcons'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'
import LineProgressBar from '../../../components/LineProgressBar'

const SavingCard = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image}
                    source={expenseCategoryIcons[props.category]} />
            </View>
            <View style={{ flex: 1 }}>
                <View style={styles.rowPlaceBetween}>
                    <Text style={[typography.SemiBoldInterH4, { color: colors.green07 }]}>{props.category}</Text>
                    <Text style={[typography.SemiBoldInterH4, { color: colors.green07 }]}>{formatCurrency(props.current)}</Text>
                </View>
                <View style={styles.rowPlaceBetween}>
                    <Text style={[typography.RegularInterH5, { color: colors.green08 }]}>Due day: 31/03/2024</Text>
                    <Text style={[typography.SemiBoldInterH5, { color: colors.green07 }]}>Saving: {formatCurrency(props.saving)}</Text>
                </View>
                <View style={{ marginVertical: 8 }}>
                    <LineProgressBar
                        completeColor={colors.green06}
                        mainColor={colors.green06}
                        subColor={colors.green01}
                        current={props.current}
                        limit={props.saving}
                        saving={props.saving} />
                </View>
                {
                    props.current >= props.saving &&
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={[typography.MediumInterH4, { color: colors.green06 }]}>You have reached the saving</Text>
                    </View>
                    ||
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={[typography.RegularInterH4, { color: colors.green07 }]}>{formatCurrency(props.saving - props.current)} left to reach the saving</Text>
                    </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 12,
        backgroundColor: 'white',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 16,
    },
    image: {
        width: 32,
        height: 32,
    },
    rowPlaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default SavingCard