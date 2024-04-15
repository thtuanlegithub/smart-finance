import { StyleSheet } from "react-native"
import colors from "../../../styles/colors";
import typography from "../../../styles/typography";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItem: 'center',
        backgroundColor: colors.gray02,
        justifyContent: 'space-between',
        paddingBottom: 24,
    },
    title: {
        backgroundColor: 'white',
        ...typography.MediumInterH4,
        color: 'black',
        textAlign: 'center',
        padding: 14,
    },
    form: {
        marginTop: 10,
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    bottomMenuItemContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});