import { View, StyleSheet } from 'react-native'
import React from 'react'
import DebtLoanSelectCategoryItem from './DebtLoanSelectCategoryItem'
import {
    ScrollView
} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
const debtLoanCategory = require('../data/debtLoanCategory.json');

const DebtLoanSelectCategoryList = (props) => {
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                {debtLoanCategory.map((item, index) => {
                    return <DebtLoanSelectCategoryItem
                        onSelect={() => props.onCategorySelect(item)}
                        key={index}
                        category={item} />
                })}
                <View style={{ height: 24 }}></View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        marginTop: 14,
        flex: 1,
    },
    container: {
        flexDirection: 'column',
    },
})


export default DebtLoanSelectCategoryList