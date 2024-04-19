import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import formatCurrency from '../../../utils/formatCurrency'
import expenseCategoryIcons from '../../../data/expenseCategoryIcons'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'
import LineProgressBar from '../../../components/LineProgressBar'

const LimitCard = (props) => {
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
                    <Text style={[typography.SemiBoldInterH5, { color: colors.green07 }]}>Limit: {formatCurrency(props.limit)}</Text>
                </View>
                <View style={{ marginVertical: 8 }}>
                    <LineProgressBar
                        mainColor={colors.red03}
                        subColor={colors.red04}
                        completeColor={colors.red05}
                        current={props.current}
                        limit={props.limit} />
                </View>
                {
                    props.current >= props.limit &&
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={[typography.MediumInterH4, { color: colors.red05 }]}>You have reached the limit</Text>
                    </View>
                    ||
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={[typography.RegularInterH4, { color: colors.red05 }]}>{formatCurrency(props.limit - props.current)} left to reach the limit</Text>
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

export default LimitCard