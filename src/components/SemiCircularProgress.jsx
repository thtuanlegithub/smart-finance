import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import typography from '../styles/typography';
import colors from '../styles/colors';
import formatCurrency from '../utils/formatCurrency';
import globalStyles from '../styles/globalStyles';
import { useTranslation } from 'react-i18next';

const SemiCircularProgress = ({ fill, limitList, categoryList}) => {
    const size = 328;
    const strokeWidth = 28;
    const radius = (size - strokeWidth) / 2;
    const circumference = Math.PI * radius;
    const totalAmount = limitList.reduce((total, limit) => total + limit.amount, 0);
    const totalCurrent = limitList.reduce((total, limit) => total + limit.current, 0);
    fill = (totalCurrent / totalAmount) * 100; 
    const progress = circumference - (fill / 100) * circumference;
    
    const { t } = useTranslation();
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
                    <Text style={[typography.MediumInterH4, { color: labelTextColor }]}>{t('total-spending')}</Text>
                    <Text style={[typography.SemiBoldInterH2, { color: contentTextColor }]}>{formatCurrency(totalCurrent) || '0'}</Text>
                </View>
            </View>
            <View style={styles.quickReportThreeColumn}>
                <View style={globalStyles.centerAlign}>
                    <Text style={[typography.RegularInterH6, { color: labelTextColor }]}>{t('limit-budget')}</Text>
                    <Text style={[typography.SemiBoldInterH6, { color: contentTextColor }]}>{formatCurrency(totalAmount)}</Text>
                </View>
                <View style={globalStyles.centerAlign}>
                    <Text style={[typography.RegularInterH6, { color: labelTextColor }]}>{t('remaining-budget')}</Text>
                    <Text style={[typography.SemiBoldInterH6, { color: contentTextColor }]}>{formatCurrency(totalAmount - totalCurrent)}</Text>
                </View>
                <View style={globalStyles.centerAlign}>
                    <Text style={[typography.RegularInterH6, { color: labelTextColor }]}>{t('due-day')}</Text>
                    <Text style={[typography.SemiBoldInterH6, { color: contentTextColor }]}>{(limitList[0] && limitList[0].to_date) || ''}</Text>
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