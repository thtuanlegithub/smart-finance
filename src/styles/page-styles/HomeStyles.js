import { StyleSheet } from "react-native";
import colors from "../colors";

export default styles = StyleSheet.create({
    container: {
        gap: 10,
        padding: 16,
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
    },
    wallet: {
        backgroundColor: 'white',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingTop: 14,
    },
    walletHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    border: {
        borderBottomWidth: 0.5,
        borderBottomColor: colors.gray03,
    },
    currentWallet: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    currentWalletIcon: {
        height: 26,
        width: 26,
    },
    currentWalletName: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    spendingReport: {

    },
    spendingReportHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    spendingReportCard: {
        gap: 16,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
    },
    summaryGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    changeReport: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    changeIcon: {
        marginLeft: 2,
        height: 20, width: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: colors.gray02,
    },

    targetProgressCard: {
        gap: 16,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 16,
    },
    targetProgressReportHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

})