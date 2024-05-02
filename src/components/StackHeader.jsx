import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import typography from '../styles/typography'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FastImage from 'react-native-fast-image'
import { getCategoryIcons } from '../features/category'
import { useNavigation } from '@react-navigation/native'

const StackHeader = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                {props.backContent
                    ?
                    <Text style={[typography.RegularInterH4, { color: 'black', marginTop: 4, marginLeft: 8 }]}>{props.backContent}</Text>
                    :
                    <>
                        <FontAwesome5 name='chevron-left' size={16} color='black' style={{ alignSelf: 'center', marginTop: 8 }} />
                        <Text style={[typography.RegularInterH4, { color: 'black', marginTop: 4, marginLeft: 8 }]}>Back</Text>
                    </>
                }
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                {props.icon
                    ?
                    <FastImage source={getCategoryIcons(props.icon)} style={{ width: 24, height: 24 }} />
                    :
                    null
                }
                <Text style={styles.title}>{props.title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItem: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        position: 'relative',
    },
    back: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        zIndex: 1,
    },
    titleContainer: {
        position: 'absolute',
        ...typography.MediumInterH4,
        color: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        padding: 14,
        flex: 1,
        left: 0,
        right: 0,
        top: 4,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    title: {
        ...typography.MediumInterH4,
        color: 'black',
    },
})

export default StackHeader