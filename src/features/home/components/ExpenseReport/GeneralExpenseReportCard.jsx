import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import colors from '../../../../styles/colors'
import typography from '../../../../styles/typography'
import PieChart from 'react-native-pie-chart'
import FastImage from 'react-native-fast-image'
import calculatePercentage from '../../../../utils/calculatePercentage'
import getSum from '../../../../utils/getSum'
import { useNavigation } from '@react-navigation/native'
const data = {
    labels: ['Rentals', 'Food & Beverage', 'Shopping', 'Transportation', 'Medical Check-up', 'Other Expense'],
    datasets: [
        {
            data: [2298000, 1555000, 458000, 210000, 80000, 48000],
        },
    ],
};

const screenWidth = Dimensions.get('window').width;
const widthAndHeight = 100
const sliceColor = [colors.green06, colors.green04, colors.green05, colors.green03, colors.green02, colors.green08]

const series = data.datasets[0].data;

const GeneralExpenseReportCard = () => {
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
                }}>Expense</Text>
                <TouchableOpacity onPress={() => handleNavigationTransactionReport("ExpenseReport")}>
                    <Text style={{
                        ...typography.SemiBoldInterH4,
                        color: colors.green06,
                    }}>See details</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.expenseReport}>
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
                                    flex: 1,
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
                                    gap: 8,
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
                                                color: colors.red01,
                                            }}
                                        >{calculatePercentage(data.datasets[0].data.reduce(getSum, 0), data.datasets[0].data[index])}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                        )}
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
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
    expenseReport: {
        marginVertical: 16,
        marginHorizontal: 16,
        marginLeft: 8,
        padding: 16,
    },
    listCategoryItemInPieChart: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
})

export default GeneralExpenseReportCard