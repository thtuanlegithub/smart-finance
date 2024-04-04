import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import formatCurrency from '../utils/formatCurrency';
import typography from '../styles/typography';
import colors from '../styles/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
function Home(props) {
    const [balances, setBalances] = useState(15000000)
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={[typography.SemiBoldInterH2, styles.balancesAmount]}>{formatCurrency(balances)}</Text>
                    <Text style={[typography.RegularInterH4, styles.totalBalancesLabel]}>Total balances</Text>
                </View>
                <View style={styles.notificationContainer}>
                    <FontAwesome5 name="bell" size={24} color={colors.green07} solid />
                </View>
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginHorizontal: 16,
        backgroundColor: colors.gray02,
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    balancesAmount: {
        color: colors.green08,
    },
    totalBalancesLabel: {
        color: colors.green07,
    },
    notificationContainer: {
        marginTop: 16,
    }
})
export default Home;