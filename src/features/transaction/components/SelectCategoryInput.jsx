import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux'
import { getCategoryIcons } from '../../category'
const SelectCategoryInput = () => {
    const category = useSelector(state => state.category.currentCategory);
    return (
        <View style={styles.container}>
            <View style={styles.labelGroup}>
                {
                    category ?
                        <Image style={styles.labelIcon} source={getCategoryIcons(category.id)} />
                        :
                        <Image style={styles.labelIcon} source={placeHolderIcon} />
                }
            </View>
            <View style={styles.inputGroup}>
                {category && category.id !== 'placeholdericon'
                    ?
                    <Text style={[typography.RegularInterH4, { color: colors.green08 }]}>{category.name}</Text>
                    :
                    <Text style={[typography.RegularInterH4, { color: colors.green08, opacity: 0.5 }]}>Select category</Text>
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

export default SelectCategoryInput