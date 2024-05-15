import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import formatCurrency from '../utils/formatCurrency';
import typography from '../styles/typography';
import colors from '../styles/colors';
import { getCategoryIcons } from '../features/category';
import getCategoryNameById from '../utils/getCategoryNameById';
import { useTranslation } from 'react-i18next';

const SpendingCategoryReport = (props) => {
    const { t } = useTranslation();
    return (
        <TouchableOpacity>
            <View style={styles.categoryReport}>
                <View>
                    <Image style={styles.categoryIcon} source={getCategoryIcons(props.category)} />
                </View>
                <View style={styles.categoryInformation}>
                    <View>
                        <Text style={[typography.MediumInterH5, { color: colors.green08 }]}>{t(props.category)}</Text>
                        <Text style={[typography.RegularInterH5, { color: colors.green08 }]}>{formatCurrency(props.amount)}</Text>
                    </View>
                    <Text style={[typography.MediumInterH5, { color: colors.red01 }]}>{props.percentage}%</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    categoryReport: {
        marginTop: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    categoryIcon: {
        height: 24,
        width: 24,
        marginRight: 10,
        marginVertical: 10
    },
    categoryInformation: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
export default SpendingCategoryReport