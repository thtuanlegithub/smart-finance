import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import findFlag from '../../../utils/flagHelper'
import { SvgUri } from 'react-native-svg'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'
import { useSelector } from 'react-redux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const CurrencyItem = ({ item }) => {
    const currentCurrncy = useSelector(state => state.currency.currentCurrency);
    return (
        <>
            {
                findFlag(item.code)
                &&
                <>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <View style={styles.container}>
                            <View overflow='hidden'
                                style={{
                                    width: 30,
                                    borderRadius: 8,
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: 8,
                                    overflow: 'hidden',
                                }}>
                                <SvgUri
                                    width={30}
                                    height={30}
                                    uri={findFlag(item.code)}
                                />
                            </View>
                            <View>
                                <Text style={{
                                    ...typography.MediumInterH4,
                                    color: colors.green08,
                                }}>{item.displayName}</Text>
                                <View style={{ flexDirection: 'row', gap: 8 }}>
                                    <Text style={{
                                        ...typography.RegularInterH4,
                                        color: colors.green07,
                                    }}>{item.code}</Text>
                                    <Text style={{
                                        ...typography.RegularInterH4,
                                        color: colors.green07,
                                    }}>-</Text>
                                    <Text style={{
                                        ...typography.RegularInterH4,
                                        color: colors.green07,
                                    }}>{item.symbol}</Text>
                                </View>
                            </View>
                        </View>
                        <FontAwesome5 name='check' size={20} color={colors.green06} />
                    </View>
                    <View style={{
                        marginHorizontal: 16,
                        borderBottomColor: colors.green08,
                        borderBottomWidth: 0.2,
                    }}></View>
                </>
            }
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingVertical: 8,
        gap: 8,
        width: '100%',
    }
})

export default CurrencyItem