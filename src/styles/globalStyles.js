import { StyleSheet } from "react-native"
import colors from './colors';
import typography from "./typography";
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
    },
    transactionInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    currencyUnitLabelBorder: {
        marginTop: 6,
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: colors.green06,
    },
    currencyUnitLabel: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        textAlign: 'center',
        ...typography.MediumInterH4,
        color: colors.green07,
    },
    input: {
        borderBottomWidth: 0.5,
        borderRadius: 8,
        borderColor: colors.green08,
        padding: 4,
        width: 300,
        ...typography.MediumInterH3,
    }
});