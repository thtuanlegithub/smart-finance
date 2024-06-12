import { View, Text, StyleSheet, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../../../styles/colors'
import typography from '../../../../styles/typography'
import formatCurrency from '../../../../utils/formatCurrency'
import CategoryItem from './CategoryItem'
import PieChart from 'react-native-pie-chart'
import expenseCategoryIcons from '../../../../data/expenseCategoryIcons'
import getSum from '../../../../utils/getSum'
import calculatePercentage from '../../../../utils/calculatePercentage'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const widthAndHeight = 140
const sliceColor = [colors.green06, colors.green04, colors.green05, colors.green03, colors.green02, colors.green08]
const CategoryReport = (props) => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const transactions = props.transactions || [];
    const handleCategoryDetailReport = (item) => {
        navigation.navigate("CategoryDetail", { selectedItem: item });
    }
    const data = {
        labels: transactions.map(transaction => t(transaction.category_id)),
        datasets: [
            {
                data: transactions.map(transaction => transaction.amount),
            },
        ],
    };
    const mergedData = data.labels.map((label, index) => {
        return {
            label: label, value: data.datasets[0].data[index]
        };
    });
    console.log((mergedData));
    const series = data.datasets[0].data;
    const seriesSum = series.reduce((a, b) => a + b, 0);
    if (seriesSum === 0) {
        return (
            <View>
                <Text>{t('no-data-to-display')}</Text>
            </View>
        );
    }
    const dynamicSliceColor = series.map((_, index) => sliceColor[index % sliceColor.length]);

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={styles.header}>
                            <View style={styles.summary}>
                                <Text style={styles.title}>{t('total')}</Text>
                                <Text style={styles.money}>{formatCurrency(data.datasets[0].data.reduce(getSum, 0))}</Text>
                            </View>
                            <View style={styles.summary}>
                                <Text style={styles.title}>{t('daily-average')}</Text>
                                <Text style={styles.money}>{formatCurrency(Math.round(data.datasets[0].data.reduce(getSum, 0) / data.datasets[0].data.length))}</Text>
                            </View>
                        </View>
                        <View style={styles.pieChartContainer}>
                            <ScrollView style={{ flex: 1 }}>
                                <View style={styles.container}>
                                    <PieChart
                                        widthAndHeight={widthAndHeight}
                                        series={series}
                                        sliceColor={dynamicSliceColor}
                                        coverRadius={0.55}
                                        coverFill={'#FFF'}
                                    />
                                    <View style={styles.listCategoryItemInPieChart}>
                                        {dynamicSliceColor.map((color, index) =>
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
                                onPress={() => { handleCategoryDetailReport(item) }}
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
        justifyContent: 'space-around',
    },
    container: {
        backgroundColor: 'white',
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
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 16,
        marginRight: 16,
    }
})

export default CategoryReport