import { View, Text } from 'react-native'
import React from 'react'
import fakeDataTimeRanges from '../../../../../data/fakeDataTimeRanges';
import { useNavigation } from '@react-navigation/native';
import AddTransactionInputViewHeader from '../../../../transaction/components/AddTransactionInputViewHeader';
const IncomeReport = () => {
    const navigation = useNavigation();
    return (
        <View style={{
            position: 'relative',
            flex: 1,
        }}>
            <AddTransactionInputViewHeader
                title='Income Detail'
                onBackPress={() => {
                    navigation.navigate("GeneralReport");
                }} />
        </View>
    )
}

export default IncomeReport