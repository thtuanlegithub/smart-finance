import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import colors from '../../../../styles/colors'
import typography from '../../../../styles/typography'
import PieChart from 'react-native-pie-chart'
import FastImage from 'react-native-fast-image'
import calculatePercentage from '../../../../utils/calculatePercentage'
import getSum from '../../../../utils/getSum'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
// const data = {
//     labels: ['Rentals', 'Food & Beverage', 'Shopping', 'Transportation', 'Medical Check-up'],
//     datasets: [
//         {
//             data: [229521, 1555000, 458000, 210000, 80000],
//         },
//     ],
// };

const screenWidth = Dimensions.get('window').width;
const widthAndHeight = 100
const sliceColor = [colors.green06, colors.green04, colors.green05, colors.green03, colors.green02, colors.green08]

const GeneralExpenseReportCard = (props) => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const transactions = props.transactions || [];
    const rawTransactions = props.rawTransactions || [];
    const data = {
        labels: transactions.map(transaction => t(transaction.category_id)),
        datasets: [
            {
                data: transactions.map(transaction => transaction.amount),
            },
        ],
    };
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
    const handleNavigationTransactionReport = (type, myData) => {
        navigation.navigate(type, { data: myData });
    }
    return (
        <View style={styles.reportCard}>
            <View style={styles.cardHeader}>
                <Text style={{
                    ...typography.SemiBoldInterH3,
                    color: colors.green08,
                }}>{t('expense')}</Text>
                <TouchableOpacity onPress={() => handleNavigationTransactionReport("ExpenseReport", rawTransactions)}>
                    <Text style={{
                        ...typography.SemiBoldInterH4,
                        color: colors.green06,
                    }}>{t('see-details')}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.expenseReport}>
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
                                        >{calculatePercentage(seriesSum, series[index])}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
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