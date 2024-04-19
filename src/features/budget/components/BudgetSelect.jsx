import { Text, View } from 'react-native'
import React from 'react'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import globalStyles from '../../../styles/globalStyles'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'
const BudgetSelect = (props) => {
    return (
        <View style={globalStyles.borderSelectContainer}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[typography.SemiBoldInterH5, { color: colors.green08, textTransform: 'capitalize' }]}>{props.selected}</Text>
            </View>
            <FontAwesome5 name="caret-down" size={16} color={colors.green08} />
        </View>
    )
}

export default BudgetSelect