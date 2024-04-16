import { Text, View } from 'react-native'
import React from 'react'
import globalStyles from '../styles/globalStyles'
import typography from '../styles/typography'
import colors from '../styles/colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const TransactionSelect = (props) => {
    return (
        <View style={globalStyles.borderSelectContainer}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {props.selected
                    ?
                    <Text style={[typography.SemiBoldInterH5, { color: colors.green08, textTransform: 'capitalize' }]}>{props.selected}</Text>
                    :
                    <Text style={[typography.RegularInterH5, { color: colors.green08 }]}>- All transaction types -</Text>
                }
            </View>

            <FontAwesome5 name="caret-down" size={16} color={colors.green08} />
        </View>
    )
}

export default TransactionSelect