import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import typography from '../../../../styles/typography'
import colors from '../../../../styles/colors'
import { BarChart } from 'react-native-chart-kit'
import incomeChartConfig from './incomeChartConfig'
import { useNavigation } from '@react-navigation/native'


const screenWidth = Dimensions.get('window').width;

const data = {
    labels: ['10', '11', '12', '13', '14', '15', '16'],
    datasets: [
        {
            data: [20000, 45000, 28000, 80000, 20000, 45000, 28000],
        },
    ],
};

const GeneralIncomeReportCard = () => {
    const navigation = useNavigation();
    const handleNavigationTransactionReport = (type) => {
        navigation.navigate(type);
    }
    return (
        <View style={styles.reportCard}>
            <View style={styles.cardHeader}>
                <Text style={{
                    ...typography.SemiBoldInterH3,
                    color: colors.green08,
                }}>Income</Text>
                <TouchableOpacity onPress={() => handleNavigationTransactionReport("IncomeReport")}>
                    <Text style={{
                        ...typography.SemiBoldInterH4,
                        color: colors.green06,
                    }}>See details</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.incomeReport}>
                <BarChart
                    bezier
                    data={data}
                    width={screenWidth - 64}
                    height={220}
                    chartConfig={incomeChartConfig}
                    fromZero
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    reportCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        paddingTop: 16,
        marginHorizontal: 16,
    },
    cardHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 24,
    },
    incomeReport: {
        marginTop: 10,
        marginLeft: 8,
    },
})

export default GeneralIncomeReportCard