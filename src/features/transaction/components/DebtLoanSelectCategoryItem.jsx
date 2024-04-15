import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import colors from '../../../styles/colors'
import typography from '../../../styles/typography'
import debtLoanCategoryIcons from '../../../data/debtLoanCategoryIcons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
const DebtLoanSelectCategoryItem = (props) => {

    return (
        <TouchableOpacity onPress={props.onSelect} style={styles.container}>
            <Image style={{ height: 24, width: 24, paddingHorizontal: 6, paddingVertical: 4, borderRadius: 6 }}
                source={debtLoanCategoryIcons[props.category]} />
            <Text style={[typography.MediumInterH5, { color: colors.green07 }]}>{props.category}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: 'white',
        gap: 12,
        borderBottomWidth: 1,
        borderColor: colors.gray02,
    },
})
export default DebtLoanSelectCategoryItem