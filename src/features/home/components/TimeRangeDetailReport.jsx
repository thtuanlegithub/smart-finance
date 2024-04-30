import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ReportHeader from './ReportHeader';
import { useNavigation } from '@react-navigation/native';

const TimeRangeDetailReport = ({ route }) => {
    const navigation = useNavigation();
    const { selectedItem } = route.params;

    return (
        <View style={styles.container}>
            <ReportHeader
                onBackPress={() => {
                    navigation.navigate("ExpenseReport")
                }}
                title={selectedItem?.label} />
        </View>
    )
}

const styles = StyleSheet.create({

});

export default TimeRangeDetailReport