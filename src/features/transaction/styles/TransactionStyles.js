import { StyleSheet } from "react-native"
import colors from "../../../styles/colors";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'white',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        flexDirection: 'column',
    },
    balancesGroup: {
        flexDirection: 'column',
    },
    walletGroup: {
        // padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    typeOfTransaction: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    calendar: {
        position: 'absolute',
        right: 0,
        bottom: 8,
    },
    timeRangeContainer: {
        height: 600,
        flex: 1,
    },
    transactionListQuickReport: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderBottomColor: colors.gray03,
    },

});