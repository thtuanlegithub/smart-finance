import { Text, View } from 'react-native'
import React from 'react'
import globalStyles from '../styles/globalStyles'
import typography from '../styles/typography'
import colors from '../styles/colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const TransactionSelect = (props) => {
    const selectedTransactionType = props.selected;
    return (
        <View style={globalStyles.borderSelectContainer}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {selectedTransactionType
                    ?
                    <Text style={[typography.SemiBoldInterH5, { color: colors.green08, textTransform: 'capitalize' }]}>{selectedTransactionType}</Text>
                    :
                    <Text style={[typography.MediumInterH5, { color: colors.green08 }]}>- All transaction type -</Text>
                }
            </View>

            <FontAwesome5 name="caret-down" size={16} color={colors.green08} />
        </View>
    )
}

export default TransactionSelect