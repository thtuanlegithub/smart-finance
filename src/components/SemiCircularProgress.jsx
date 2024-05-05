import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import typography from '../styles/typography';
import colors from '../styles/colors';
import formatCurrency from '../utils/formatCurrency';
import globalStyles from '../styles/globalStyles';
const SemiCircularProgress = ({ fill }) => {
    const size = 328;
    const strokeWidth = 28;
    const radius = (size - strokeWidth) / 2;
    const circumference = Math.PI * radius;
    const progress = circumference - (fill / 100) * circumference;
    let mainColor;
    let subColor;
    let labelTextColor;
    let contentTextColor;
    if (fill >= 75) {
        mainColor = colors.red05;
        subColor = colors.red04;
        labelTextColor = colors.red05;
        contentTextColor = colors.red02;
    }
    else if (fill >= 50) {
        mainColor = colors.orange04;
        subColor = colors.orange02;
        labelTextColor = colors.orange05;
        contentTextColor = colors.orange04;
    }
    else {
        mainColor = colors.green07;
        subColor = colors.green03;
        labelTextColor = colors.green08;
        contentTextColor = colors.green07;
    }
    return (
        <View>
            <View style={{ position: 'relative' }}>
                <Svg width={size} height={(size - 150)}>
                    <Path
                        stroke={subColor}
                        strokeLinejoin='round'
                        strokeLinecap='round'
                        fill="none"
                        strokeWidth={strokeWidth}
                        d={`M ${strokeWidth / 2},${size / 2} A ${radius},${radius} 0 0,1 ${size - strokeWidth / 2},${size / 2}`}
                    />
                    <Path
                        strokeLinejoin='round'
                        strokeLinecap='round'
                        stroke={mainColor}
                        fill="none"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={progress}
                        d={`M ${strokeWidth / 2},${size / 2} A ${radius},${radius} 0 0,1 ${size - strokeWidth / 2},${size / 2}`}
                    />
                </Svg>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 20,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flex: 1,
                }}>
                    <Text style={[typography.MediumInterH4, { color: labelTextColor }]}>Total spending</Text>
                    <Text style={[typography.SemiBoldInterH2, { color: contentTextColor }]}>{formatCurrency(2500000)}</Text>
                </View>
            </View>
            <View style={styles.quickReportThreeColumn}>
                <View style={globalStyles.centerAlign}>
                    <Text style={[typography.RegularInterH6, { color: labelTextColor }]}>Limit budget</Text>
                    <Text style={[typography.SemiBoldInterH6, { color: contentTextColor }]}>{formatCurrency(3000000)}</Text>
                </View>
                <View style={globalStyles.centerAlign}>
                    <Text style={[typography.RegularInterH6, { color: labelTextColor }]}>Remain money</Text>
                    <Text style={[typography.SemiBoldInterH6, { color: contentTextColor }]}>{formatCurrency(500000)}</Text>
                </View>
                <View style={globalStyles.centerAlign}>
                    <Text style={[typography.RegularInterH6, { color: labelTextColor }]}>Due day</Text>
                    <Text style={[typography.SemiBoldInterH6, { color: contentTextColor }]}>4 days</Text>
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    quickReportThreeColumn: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
    }
})

export default SemiCircularProgress;