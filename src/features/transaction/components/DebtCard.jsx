import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import formatCurrency from '../../../utils/formatCurrency'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'
import { useNavigation } from '@react-navigation/native'

const DebtCard = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => {
            props.onSelect();
            navigation.navigate('Add Transaction');

        }} style={styles.container}>
            <Image style={styles.icon} source={require('../../../assets/images/debt.png')} />
            <View style={styles.debtCardInformation}>
                <View style={styles.leftContainer}>
                    <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>Debt</Text>
                    <Text style={[typography.RegularInterH4, { color: colors.green08 }]}>Debt note</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>{formatCurrency(props.debt.amount)}</Text>
                    <Text style={[typography.MediumInterH4, { color: colors.red01 }]}>{formatCurrency(props.debt.remain)} left</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 32,
        paddingVertical: 24,
        alignItems: 'center',
    },
    icon: {
        width: 32,
        height: 32,
    },
    debtCardInformation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginLeft: 16,
    },
    leftContainer: {

    },
    rightContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})

export default DebtCard