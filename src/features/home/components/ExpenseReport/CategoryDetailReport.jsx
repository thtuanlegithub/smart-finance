import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import ReportHeader from '../ReportHeader';
import typography from '../../../../styles/typography';
import colors from '../../../../styles/colors';
import formatCurrency from '../../../../utils/formatCurrency';
import fakeDataBarChart from '../../../../data/fakeDataBarChart';
import { FlatList } from 'react-native-gesture-handler';
import getSum from '../../../../utils/getSum';
import { BarChart } from 'react-native-chart-kit';
import chartConfig from '../chartConfig';
import TimeItem from './TimeItem';


const screenWidth = Dimensions.get('window').width;

const CategoryDetailReport = ({ route }) => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.navigate("ExpenseReport")
    }
    const mergedData = fakeDataBarChart.labels.map((label, index) => {
        return { label: label, value: fakeDataBarChart.datasets[0].data[index] };
    });
    const { selectedItem } = route.params;
    return (
        <View style={styles.container}>
            <ReportHeader
                onBackPress={handleBackPress}
                title={selectedItem.label} />
            <View style={styles.overall}>
                <Text style={styles.overallContent}>25/03/2024 - 31/03/2024</Text>
            </View>
            <View style={styles.listReportContainer}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <View style={styles.header}>
                                <View style={styles.summary}>
                                    <Text style={styles.title}>Total</Text>
                                    <Text style={styles.money}>{formatCurrency(data.datasets[0].data.reduce(getSum, 0))}</Text>
                                </View>
                                <View style={styles.summary}>
                                    <Text style={styles.title}>Daily Average</Text>
                                    <Text style={styles.money}>{formatCurrency(Math.round(data.datasets[0].data.reduce(getSum, 0) / data.datasets[0].data.length))}</Text>
                                </View>
                            </View>
                            <View style={styles.barChartContainer}>
                                <BarChart
                                    bezier
                                    data={data}
                                    width={screenWidth * 0.95}
                                    height={220}
                                    chartConfig={chartConfig}
                                    fromZero
                                />
                            </View>
                        </>
                    }
                    data={mergedData}
                    renderItem={
                        ({ item }) => {
                            return (
                                <TimeItem
                                    item={item} />
                            )
                        }
                    } />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listReportContainer: {
        backgroundColor: 'white',
    },
    overall: {
        backgroundColor: 'white',
        padding: 8,
        marginTop: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    overallLabel: {
        ...typography.MediumInterH4,
        color: colors.green07,
    },
    overallContent: {
        ...typography.MediumInterH4,
        color: colors.green08,
    },
    moneyContent: {
        ...typography.MediumInterH3,
        color: colors.red01,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    summary: {
        alignItems: 'center'
    },
    title: {
        ...typography.MediumInterH4,
        color: colors.green07,
    },
    money: {
        ...typography.SemiBoldInterH4,
        color: colors.red01,
    },
    barChartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginRight: 16
    },
})
export default CategoryDetailReport