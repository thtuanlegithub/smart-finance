import { View, StyleSheet } from 'react-native'
import React from 'react'
import NewCategoryButton from '../NewCategoryButton'
import debtLoanCategoryIcons from '../../../../data/debtLoanCategoryIcons'
import DebtLoanSelectCategoryItem from '../DebtLoanSelectCategoryItem'
import {
    ScrollView
} from 'react-native-gesture-handler'
const DebtLoanSelectCategoryList = () => {
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                {Object.entries(debtLoanCategoryIcons).map(([key, value], index) => {
                    return <DebtLoanSelectCategoryItem key={index} category={key} />
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