import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CircularProgress from './CircularProgress'
import formatCurrency from '../utils/formatCurrency'
import colors from '../styles/colors'
import typography from '../styles/typography';
import { useTranslation } from 'react-i18next'

const LimitItem = (props) => {
    const limit = props.limit;
    const { t } = useTranslation();
    const fill = Math.round((limit.current / limit.amount) * 100);

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
        <View style={styles.limitItem}>
            <View style={styles.limitProgress}>
                <CircularProgress fill={fill} subColor={subColor} mainColor={mainColor} textColor={contentTextColor} />
            </View>
            <View style={styles.limitInformation}>
                <View>
                    <View style={styles.limitInformationHeader}>
                    <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>{t(limit.category_id)}</Text>
                        {/* <View style={styles.tagItem}>
                            <Text style={[typography.MediumInterH6, { color: 'white' }]}>Limit</Text>
                        </View> */}
                    </View>
                    <Text style={[typography.MediumInterH5, { color: colors.green05 }]}>{formatCurrency(limit.current) || 0} /</Text>
                    <Text style={[typography.MediumInterH5, { color: colors.green05 }]}>{formatCurrency(limit.amount)} VND</Text>
                    <Text style={[typography.RegularInterH6, styles.completedPrediction]}>{t('due-day')}: {limit.to_date}</Text>
                </View>
                <View style={styles.moneyLeftGroup}>
                    <Text style={[styles.moneyLeft, typography.MediumInterH5, { color: colors.green08 }]}>{t('left')}</Text>
                    <Text style={[styles.moneyLeft, typography.MediumInterH5, { color: colors.green08 }]}>{formatCurrency(limit.amount-limit.current)}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    limitItem: {
        backgroundColor: colors.gray01,
        borderRadius: 8,
        flexDirection: 'row',
        gap: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    limitProgress: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    limitInformation: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    limitInformationHeader: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    tagItem: {
        backgroundColor: colors.red03,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        height: 24,
        // padding: 4,
        paddingHorizontal: 10,
    },
    completedPrediction: {
        width: 170,
        paddingTop: 4,
        color: colors.green08,
    },
    moneyLeftGroup: {
        flex: 1,
        marginHorizontal: -20,
    },
    moneyLeft: {
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
})

export default LimitItem