import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import colors from '../../../styles/colors'
import typography from '../../../styles/typography'
import getCategoryIcons from '../utils/iconHelper'
import { useTranslation } from 'react-i18next'

const IncomeSelectCategoryItem = (props) => {
    const { t } = useTranslation();
    const category = props.category;
    return (
        <TouchableOpacity onPress={props.onSelect} style={styles.container}>
            <Image style={{ height: 24, width: 24, paddingHorizontal: 6, paddingVertical: 4, borderRadius: 6 }}
                source={getCategoryIcons(category.id)} />
            <Text style={[typography.MediumInterH5, { color: colors.green07 }]}>{t(category.id)}</Text>
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
export default IncomeSelectCategoryItem