import { StyleSheet } from "react-native"
import colors from '../styles/colors';
export default globalStyles = StyleSheet.create({
    currentWalletIcon: {
        height: 20,
        width: 20,
    },
    walletContainer: {
        backgroundColor: colors.gray02,
        paddingHorizontal: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    centerAlign: {
        alignItems: 'center',
    },
    borderSelectContainer: {
        width: 190,
        marginTop: 10,
        borderWidth: 1,
        borderColor: colors.green07,
        padding: 10,
        borderRadius: 8,
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 12,
        justifyContent: 'space-between',
    },
    transactionIcon: {
        height: 26,
        width: 26
    }

});