import { View, Text } from 'react-native'
import React from 'react'
import AddTransactionInputViewHeader from '../../AddTransactionInputViewHeader'
import { useNavigation } from '@react-navigation/native';

const TaxForm = () => {
    const navigation = useNavigation();
    return (
        <View>
            <AddTransactionInputViewHeader
                onBackPress={() => navigation.goBack()}
                title='Tax' />
        </View>
    )
}

export default TaxForm