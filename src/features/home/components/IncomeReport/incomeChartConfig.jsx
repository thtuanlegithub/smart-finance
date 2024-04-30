const data = {
    labels: ['10', '11', '12', '13', '14', '15', '16'],
    datasets: [
        {
            data: [20000, 45000, 28000, 80000, 20000, 45000, 28000],
        },
    ],
};

export default incomeChartConfig = {
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
    barPercentage: 5.5 / data.datasets[0].data.length,
};
