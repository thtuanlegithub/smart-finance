import { View, StyleSheet } from 'react-native'
import React from 'react'
import NewCategoryButton from './NewCategoryButton'
import ExpenseSelectCategoryItem from './ExpenseSelectCategoryItem'
import {
    ScrollView
} from 'react-native-gesture-handler'
const expenseCategory = require('../data/expenseCategory.json');

const ExpenseSelectCategoryList = (props) => {
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <NewCategoryButton />
                {expenseCategory.map((item, index) => {
                    return <ExpenseSelectCategoryItem
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
        flex: 1,
    },
    container: {
        flexDirection: 'column',
    },
})


export default ExpenseSelectCategoryList