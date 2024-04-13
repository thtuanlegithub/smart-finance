import { View, StyleSheet } from 'react-native'
import React from 'react'
import NewCategoryButton from '../NewCategoryButton'
import incomeCategoryIcons from '../../../../data/incomeCategoryIcons'
import IncomeSelectCategoryItem from '../IncomeSelectCategoryItem'
import { ScrollView } from 'react-native-gesture-handler'

const IncomeSelectCategoryList = () => {
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <NewCategoryButton />
                {Object.entries(incomeCategoryIcons).map(([key, value], index) => {
                    return <IncomeSelectCategoryItem key={index} category={key} />
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