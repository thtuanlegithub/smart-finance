import colors from "../../../styles/colors";
import typography from "../../../styles/typography";

export default styles = {
    container: {
        marginTop: 10,
        marginHorizontal: 16,
        borderRadius: 10,
        padding: 16,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    rightHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dateText: {
        ...typography.MediumInterH2,
        color: colors.green08,
        paddingRight: 10,
    },
    dayText: {
        ...typography.MediumInterH5,
        color: colors.green08
    },
    monthYearText: {
        ...typography.RegularInterH6,
        color: colors.green08
    },
    totalMoneyOfDay: {
        ...typography.MediumInterH4,
        color: colors.green08
    }
}