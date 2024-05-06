import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import colors from '../../../styles/colors'
import typography from '../../../styles/typography'
import { useTranslation } from 'react-i18next'
const NewCategoryButton = () => {
    const { t } = useTranslation();
    return (
        <View style={styles.newCategoryContainer}>
            <FontAwesome5 style={{ backgroundColor: colors.green05, paddingHorizontal: 6, paddingVertical: 4, borderRadius: 6 }} name='plus' size={20} color='white' />
            <Text style={[typography.SemiBoldInterH5, { color: colors.green06 }]}>{t('new-category')}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    newCategoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: 'white',
        marginVertical: 14,
        gap: 12,
    },
})
export default NewCategoryButton