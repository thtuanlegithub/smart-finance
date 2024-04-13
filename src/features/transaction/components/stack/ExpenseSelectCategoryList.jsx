import { View, StyleSheet } from 'react-native'
import React from 'react'
import NewCategoryButton from '../NewCategoryButton'
import expenseCategoryIcons from '../../../../data/expenseCategoryIcons'
import ExpenseSelectCategoryItem from '../ExpenseSelectCategoryItem'
import {
    ScrollView
} from 'react-native-gesture-handler'
const ExpenseSelectCategoryList = () => {
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <NewCategoryButton />
                {Object.entries(expenseCategoryIcons).map(([key, value], index) => {
                    return <ExpenseSelectCategoryItem key={index} category={key} />
                })}
                <View style={{ height: 24 }}></View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    container: {
        flexDirection: 'column',
    },
})


export default ExpenseSelectCategoryList