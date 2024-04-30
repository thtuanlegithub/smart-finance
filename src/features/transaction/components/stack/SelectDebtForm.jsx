import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AddTransactionInputViewHeader from '../AddTransactionInputViewHeader'
import { useNavigation } from '@react-navigation/native';
import colors from '../../../../styles/colors';
import DebtCard from '../../../category/components/DebtCard';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setTransactionReference } from '../../services/addTransactionFormSlice';

const SelectDebtForm = () => {
    const navigation = useNavigation();
    const DebtList = [{
        id: 1,
        amount: 200000,
        remain: 100000,
        note: 'Debt note',
        date: 'March 20, 2024',
        wallet: 'Wallet 1',
    },
    {
        id: 2,
        amount: 100000,
        remain: 50000,
        note: 'Debt note',
        date: 'March 20, 2024',
        wallet: 'Wallet 2',
    },
    {
        id: 3,
        amount: 125000,
        remain: 125000,
        note: 'Debt note',
        date: 'March 20, 2024',
        wallet: 'Wallet 3',
    },
    {
        id: 4,
        amount: 200000,
        remain: 100000,
        note: 'Debt note',
        date: 'March 20, 2024',
        wallet: 'Wallet 4',
    },
    {
        id: 5,
        amount: 200000,
        remain: 100000,
        note: 'Debt note',
        date: 'March 20, 2024',
        wallet: 'Wallet 5',
    },
    ]
    const dispatch = useDispatch();
    const handleSelectDebt = (debt) => {
        dispatch(setTransactionReference(debt));
    }
    return (
        <View style={styles.container}>
            <AddTransactionInputViewHeader title='Select Debt'
                onBackPress={() => {
                    navigation.navigate('Add Transaction');
                }}
            />
            <View style={{ marginTop: 10, gap: 1 }}>
                <FlatList
                    data={DebtList}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <DebtCard onSelect={() => handleSelectDebt(item)} debt={item} />}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray01,
        flexDirection: 'column'
    },
})

export default SelectDebtForm