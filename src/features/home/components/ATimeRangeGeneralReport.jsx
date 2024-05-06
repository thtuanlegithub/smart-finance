import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import formatCurrency from '../../../utils/formatCurrency';
import GeneralIncomeReportCard from './IncomeReport/GeneralIncomeReportCard';
import GeneralExpenseReportCard from './ExpenseReport/GeneralExpenseReportCard';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';


const ATimeRangeGeneralReport = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const handleNavigationTransactionReport = (type) => {
        navigation.navigate(type);
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <GeneralIncomeReportCard />
                <GeneralExpenseReportCard />
                <View style={styles.reportCard}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{t('debt')}</Text>
                        <TouchableOpacity>
                            <Text style={styles.cardAction}>{t('see-all')}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.debtLoanSummary}>{formatCurrency(500000)}</Text>
                    <View style={styles.debtLoanBorder}></View>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{t('loan')}</Text>
                        <TouchableOpacity>
                            <Text style={styles.cardAction}>{t('see-all')}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.debtLoanSummary}>{formatCurrency(500000)}</Text>
                </View>
                <View style={{ marginBottom: 32 }}></View>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 8,
        gap: 16,
    },
    reportCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        paddingVertical: 16,
        marginHorizontal: 16,

    },
    cardHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 24,
    },
    cardTitle: {
        ...typography.SemiBoldInterH3,
        color: colors.green08,
    },
    cardAction: {
        ...typography.SemiBoldInterH4,
        color: colors.green06,
    },
    debtLoanSummary: {
        ...typography.SemiBoldInterH3,
        color: colors.green07,
        paddingLeft: 24
    },
    debtLoanBorder: {
        borderBottomWidth: 0.5,
        borderBottomColor: colors.gray03,
        marginHorizontal: 32,
        marginVertical: 10,
    }
})

export default ATimeRangeGeneralReport