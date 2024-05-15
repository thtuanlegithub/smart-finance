import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import typography from '../../../styles/typography';
import { useTranslation } from 'react-i18next';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getCategoryIcons } from '../../category';
import getInvesmentNameById from '../../../utils/getInvesmentNameById';
import getInvestmentIcons from '../../../utils/getInvestmentIcons';
import { useSelector } from 'react-redux';

const SelectInvestmentCategory = (props) => {
    const { t } = useTranslation();
    const category = props.category;
    return (
        <View style={styles.container}>
            <View style={styles.labelGroup}>
                {
                    category ?
                        <Image style={styles.labelIcon} source={getInvestmentIcons(category?.id)} />
                        :
                        <Image style={styles.labelIcon} source={getInvestmentIcons(null)} />
                }
            </View>
            <View style={styles.inputGroup}>
                {category && category?.id !== 'placeholdericon'
                    ?
                    <Text style={[typography.RegularInterH4, { color: colors.green08 }]}>{t(category?.id)}</Text>
                    :
                    <Text style={[typography.RegularInterH4, { color: colors.green08, opacity: 0.5 }]}>{t('select-investment-category')}</Text>
                }
                <FontAwesome5 name="chevron-right" size={16} color={colors.green08} opacity={0.5} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    labelGroup: {
        width: 61,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputGroup: {
        flex: 1,
        borderBottomWidth: 0.5,
        borderColor: colors.green08,
        height: 52,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    labelIcon: {
        height: 30,
        width: 30,
    }
})

export default SelectInvestmentCategory