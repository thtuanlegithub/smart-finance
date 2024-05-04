import { View, StyleSheet } from 'react-native'
import React from 'react'
import NewCategoryButton from './NewCategoryButton'
import IncomeSelectCategoryItem from './IncomeSelectCategoryItem'
import { ScrollView } from 'react-native-gesture-handler'
const incomeCategory = require('../data/incomeCategory.json');

const IncomeSelectCategoryList = (props) => {
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <NewCategoryButton />
                {incomeCategory.map((item, index) => {
                    return <IncomeSelectCategoryItem
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

export default IncomeSelectCategoryList