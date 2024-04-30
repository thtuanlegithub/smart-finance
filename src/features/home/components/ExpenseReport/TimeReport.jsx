import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import formatCurrency from '../../../../utils/formatCurrency'
import typography from '../../../../styles/typography'
import colors from '../../../../styles/colors'
import { BarChart } from 'react-native-chart-kit';
import TimeItem from './TimeItem'
import getSum from '../../../../utils/getSum'
import fakeDataBarChart from '../../../../data/fakeDataBarChart';

const screenWidth = Dimensions.get('window').width;

const TimeReport = () => {
    const mergedData = fakeDataBarChart.labels.map((label, index) => {
        return { label: label, value: fakeDataBarChart.datasets[0].data[index] };
    });
    return (
        <View style={styles.container}>
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
    )
}

const chartConfig = {
    backgroundColor: "white",
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    fillShadowGradient: colors.green06,
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientFrom: colors.green06,
    fillShadowGradientTo: colors.green06,
    fillShadowGradientToOpacity: 1,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(64, 145, 108,${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    propsForBackgroundLines: {
        strokeDasharray: '0',
        strokeWidth: 1,
        stroke: colors.gray02,
    },
    propsForLabels: {
    },
    barPercentage: 7 / data.datasets[0].data.length,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
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

export default TimeReport