import { View, Text } from 'react-native'
import React, { useState } from 'react'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'
import formatCurrency from '../../../utils/formatCurrency'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import SpendingCategoryReport from '../../../components/SpendingCategoryReport'
import styles from '../HomeStyles'
const MonthReport = () => {
    const [spendingMoney, setSpendingMoney] = useState(1225000);
    return (
        <View style={styles.spendingReportCardContainer}>
            <View>
                <Text style={[typography.BoldInterH3, { color: colors.green07 }]}>{formatCurrency(spendingMoney)} VND</Text>
                <View style={styles.summaryGroup}>
                    <Text style={[typography.RegularInterH5]}>Total spend of this month</Text>
                    <View style={styles.changeReport}>
                        <View style={styles.changeIcon}>
                            <FontAwesome5 name="arrow-down" size={11} color={colors.green06} />
                        </View>
                        <Text style={[typography.MediumInterH5, { color: colors.green07 }]}> 15%</Text>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 16 }}>
                <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>Top spending</Text>
                <SpendingCategoryReport category="Food & Beverage" amount={825000} percentage={67} />
                <SpendingCategoryReport category="Shopping" amount={250000} percentage={20} />
                <SpendingCategoryReport category="Transportation" amount={150000} percentage={13} />
            </View>
        </View>
    )
}

export default MonthReport