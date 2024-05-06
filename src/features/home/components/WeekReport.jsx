import { View, Text } from 'react-native'
import React, { useState } from 'react'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'
import formatCurrency from '../../../utils/formatCurrency'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import SpendingCategoryReport from '../../../components/SpendingCategoryReport'
import styles from '../HomeStyles'
import { useTranslation } from 'react-i18next'
const WeekReport = () => {
    const { t } = useTranslation();
    const [spendingMoney, setSpendingMoney] = useState(500000);
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 4 }}>
            <View>
                <Text style={[typography.BoldInterH3, { color: colors.green07 }]}>{formatCurrency(spendingMoney)} VND</Text>
                <View style={styles.summaryGroup}>
                    <Text style={[typography.RegularInterH5]}>{t('total-spend-of-this-week')}</Text>
                    <View style={styles.changeReport}>
                        <View style={styles.changeIcon}>
                            <FontAwesome5 name="arrow-up" size={11} color={colors.red03} />
                        </View>
                        <Text style={[typography.MediumInterH5, { color: colors.red03 }]}> 15%</Text>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 16 }}>
                <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>Top spending</Text>
                <SpendingCategoryReport category="Food & Beverage" amount={400000} percentage={80} />
                <SpendingCategoryReport category="Shopping" amount={50000} percentage={10} />
                <SpendingCategoryReport category="Transportation" amount={50000} percentage={10} />
            </View>
        </View>
    )
}

export default WeekReport