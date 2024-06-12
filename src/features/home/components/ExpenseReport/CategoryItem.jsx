import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import typography from '../../../../styles/typography'
import colors from '../../../../styles/colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import formatCurrency from '../../../../utils/formatCurrency'

const CategoryItem = (props) => {
    return (
        <View style={{
            width: '100%',
            justifyContent: 'center',
            borderTopWidth: 1,
            borderTopColor: colors.gray02,
        }}>
            <TouchableOpacity
                onPress={props.onPress}
                style={{
                    paddingVertical: 16,
                    paddingHorizontal: 24,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    {/* <FastImage
                        source={expenseCategoryIcons[props.item.label]}
                        style={{
                            height: 22,
                            width: 22,
                            marginRight: 10,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    /> */}
                    <Text style={{
                        ...typography.RegularInterH4,
                        color: colors.green08,
                    }}>{props.item.label}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    gap: 16, justifyContent: 'center',
                    alignPropss: 'center'
                }}>
                    <Text style={{
                        ...typography.RegularInterH4,
                        color: colors.red01,
                    }}>{formatCurrency(props.item.value)}</Text>
                    <FontAwesome5
                        name="chevron-right"
                        opacity={0.5}
                        size={14}
                        color={colors.green08}
                        solid />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CategoryItem