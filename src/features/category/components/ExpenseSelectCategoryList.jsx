import { View, StyleSheet } from 'react-native'
import React from 'react'
import NewCategoryButton from './NewCategoryButton'
import ExpenseSelectCategoryItem from './ExpenseSelectCategoryItem'
import {
    FlatList,
} from 'react-native-gesture-handler'
const expenseCategory = require('../data/expenseCategory.json');

const ExpenseSelectCategoryList = (props) => {
    return (
        <View style={styles.outerContainer}>
            <View contentContainerStyle={styles.container}>
                <FlatList
                    ListHeaderComponent={NewCategoryButton}
                    data={expenseCategory}
                    renderItem={({ item }) => <ExpenseSelectCategoryItem
                        onSelect={() => props.onCategorySelect(item)}
                        category={item} />}
                    keyExtractor={item => item.id.toString()}
                />
                <View style={{ height: 24 }}></View>
            </View>
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