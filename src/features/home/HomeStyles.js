import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import typography from "../../styles/typography";
export default styles = StyleSheet.create({
    spendingReportCardContainer:
    {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 4,
        paddingHorizontal: 8
    },
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
        ...typography.SemiBoldInterH2,
        color: colors.green07,
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
        flexDirection: 'column',
        flex: 1,
    },
    spendingReportHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    spendingReportCard: {
        flexDirection: 'column',
        flex: 1,
        gap: 16,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        height: 320,
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