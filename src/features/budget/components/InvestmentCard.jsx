import { View, Image, StyleSheet, Text } from 'react-native'
import React from 'react'
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import formatCurrency from '../../../utils/formatCurrency';

const InvestmentCard = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {
                    props.type == 'dynamic'
                        ?
                        <Image style={styles.image} source={require('../../../assets/images/dynamicinvest.png')} />
                        :
                        <Image style={styles.image} source={require('../../../assets/images/fixinvestment.png')} />
                }
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Text style={{ ...typography.MediumInterH4, color: colors.green08 }}>{props.name}</Text>
                    {
                        props.type == 'dynamic'
                            ?
                            <View style={{ marginLeft: 8, backgroundColor: colors.orange04, padding: 2, borderRadius: 16, paddingHorizontal: 16 }}>
                                <Text style={{ color: 'white', ...typography.MediumInterH6 }}>
                                    Dynamic
                                </Text>
                            </View>
                            :
                            <View style={{ marginLeft: 8, backgroundColor: colors.green06, padding: 2, borderRadius: 16, paddingHorizontal: 16 }}>
                                <Text style={{ color: 'white', ...typography.MediumInterH6 }}>
                                    Fixed
                                </Text>
                            </View>
                    }
                </View>
                <View style={styles.rowPlaceBetween}>
                    <Text style={{ ...typography.RegularInterH6, color: colors.green08 }}>Due day: {props.dueDay}</Text>
                    <Text style={{ ...typography.MediumInterH6, color: colors.blue05 }}>Principal: {formatCurrency(props.principal)}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', marginTop: 8 }}>
                    <Text style={{ ...typography.MediumInterH5, color: colors.blue05 }}>Total interest: +{formatCurrency(props.principal)}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
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
        marginTop: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default InvestmentCard