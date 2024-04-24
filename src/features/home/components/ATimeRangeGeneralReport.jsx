import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import TimeReport from './TimeReport';
import CategoryReport from './CategoryReport';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import formatCurrency from '../../../utils/formatCurrency';
import { BarChart } from 'react-native-chart-kit';
import incomeChartConfig from './incomeChartConfig';
import PieChart from 'react-native-pie-chart';
import FastImage from 'react-native-fast-image';
import calculatePercentage from '../../../utils/calculatePercentage';
import getSum from '../../../utils/getSum';
import GeneralIncomeReportCard from './GeneralIncomeReportCard';
import GeneralExpenseReportCard from './GeneralExpenseReportCard';
import { ScrollView } from 'react-native-gesture-handler';


const ATimeRangeGeneralReport = () => {
    const navigation = useNavigation();
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
                        <Text style={styles.cardTitle}>Debt</Text>
                        <TouchableOpacity>
                            <Text style={styles.cardAction}>See alls</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.debtLoanSummary}>{formatCurrency(500000)}</Text>
                    <View style={styles.debtLoanBorder}></View>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Loan</Text>
                        <TouchableOpacity>
                            <Text style={styles.cardAction}>See alls</Text>
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