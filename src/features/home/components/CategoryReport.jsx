import { View, Text, StyleSheet, FlatList, Dimensions, ScrollView, Image } from 'react-native'
import React from 'react'
import colors from '../../../styles/colors'
import typography from '../../../styles/typography'
import formatCurrency from '../../../utils/formatCurrency'
import CategoryItem from './CategoryItem'
import PieChart from 'react-native-pie-chart'
import expenseCategoryIcons from '../../../data/expenseCategoryIcons'
import getSum from '../../../utils/getSum'
import calculatePercentage from '../../../utils/calculatePercentage'
import FastImage from 'react-native-fast-image'

const screenWidth = Dimensions.get('window').width;
const piedata = [
    { name: 'Rentals', population: 2298000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Food & Beverage', population: 1555000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
];

const data = {
    labels: ['Rentals', 'Food & Beverage', 'Shopping', 'Transportation', 'Medical Check-up', 'Other Expense'],
    datasets: [
        {
            data: [2298000, 1555000, 458000, 210000, 80000, 48000],
        },
    ],
};

const CategoryReport = () => {
    const mergedData = data.labels.map((label, index) => {
        return { label: label, value: data.datasets[0].data[index] };
    });

    const widthAndHeight = 140
    const sliceColor = [colors.green06, colors.green04, colors.green05, colors.green03, colors.green02, colors.green08]
    const series = data.datasets[0].data;

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
                        <View style={styles.pieChartContainer}>
                            <ScrollView style={{ flex: 1 }}>
                                <View style={styles.container}>
                                    <PieChart
                                        widthAndHeight={widthAndHeight}
                                        series={series}
                                        sliceColor={sliceColor}
                                        coverRadius={0.55}
                                        coverFill={'#FFF'}
                                    />
                                    <View style={styles.listCategoryItemInPieChart}>
                                        {sliceColor.map((color, index) =>
                                        (
                                            <View
                                                key={index}
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    flex: 1
                                                }}>
                                                <View
                                                    style={{
                                                        backgroundColor: color,
                                                        width: 14,
                                                        height: 14,
                                                        marginRight: 8,

                                                    }}></View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }}>
                                                    <Text
                                                        style={{
                                                            ...typography.MediumInterH6,
                                                            color: colors.green07,
                                                        }}>{data.labels[index]}
                                                    </Text>
                                                    <View style={{ marginLeft: 4, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                                        <FastImage
                                                            style={{ height: 14, width: 14 }}
                                                            source={expenseCategoryIcons[data.labels[index]]}
                                                            resizeMode={FastImage.resizeMode.contain}
                                                        />
                                                        <View style={{
                                                            height: 1,
                                                            width: 10,
                                                            backgroundColor: colors.green06
                                                        }}></View>
                                                        <Text
                                                            style={{
                                                                ...typography.MediumInterH6,
                                                                color: colors.green08,
                                                            }}
                                                        >{calculatePercentage(data.datasets[0].data.reduce(getSum, 0), data.datasets[0].data[index])}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                        )}
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </>
                }
                data={mergedData}
                renderItem={
                    ({ item }) => {
                        return (
                            <CategoryItem
                                item={item} />
                        )
                    }
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listCategoryItemInPieChart: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        flexDirection: 'row',
        gap: 16,
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
    pieChartContainer: {
        // alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 16,
        marginRight: 16,
    }
})

export default CategoryReport