import colors from "../../../styles/colors";
import typography from "../../../styles/typography";

export default styles = {
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    transactionInfomation: {
        marginLeft: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    detailInformation: {
        flexDirection: 'column',
    },
    transactionType: {
        ...typography.MediumInterH6,
        color: colors.green08,
    },
    transactionNote: {
        ...typography.RegularInterH6,
        color: colors.green07,
    },
    transactionAmount: {
        ...typography.RegularInterH4,
        color: colors.red01,
    }
}