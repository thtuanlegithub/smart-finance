import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import formatCurrency from '../../../utils/formatCurrency'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'
import { useNavigation } from '@react-navigation/native'

const LoanCard = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => {
            props.onSelect();
            navigation.navigate('Add Transaction');

        }} style={styles.container}>
            <Image style={styles.icon} source={require('../../../assets/images/loan.png')} />
            <View style={styles.loanCardInformation}>
                <View style={styles.leftContainer}>
                    <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>Loan</Text>
                    <Text style={[typography.RegularInterH4, { color: colors.green08 }]}>Loan note</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>{formatCurrency(props.loan.amount)}</Text>
                    <Text style={[typography.MediumInterH4, { color: colors.red01 }]}>{formatCurrency(props.loan.remain)} left</Text>
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
    loanCardInformation: {
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

export default LoanCard