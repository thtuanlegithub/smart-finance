import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AddTransactionInputViewHeader from '../../../components/AddTransactionInputViewHeader'
import { useNavigation } from '@react-navigation/native';
import colors from '../../../../../styles/colors';
import LoanCard from '../../../../category/components/LoanCard';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setTransactionReference } from '../../../services/addTransactionFormSlice';

const SelectLoanForm = () => {
    const navigation = useNavigation();
    const LoanList = [{
        id: 1,
        amount: 200000,
        remain: 100000,
        note: 'Loan note',
        date: 'March 20, 2024',
        wallet: 'Wallet 1',
    },
    {
        id: 2,
        amount: 100000,
        remain: 50000,
        note: 'Loan note',
        date: 'March 20, 2024',
        wallet: 'Wallet 2',
    },
    {
        id: 3,
        amount: 125000,
        remain: 125000,
        note: 'Loan note',
        date: 'March 20, 2024',
        wallet: 'Wallet 3',
    },
    {
        id: 4,
        amount: 200000,
        remain: 100000,
        note: 'Loan note',
        date: 'March 20, 2024',
        wallet: 'Wallet 4',
    },
    {
        id: 5,
        amount: 200000,
        remain: 100000,
        note: 'Loan note',
        date: 'March 20, 2024',
        wallet: 'Wallet 5',
    },
    ]
    const dispatch = useDispatch();
    const handleSelectLoan = (loan) => {
        dispatch(setTransactionReference(loan));
    }
    return (
        <View style={styles.container}>
            <AddTransactionInputViewHeader title='Select Loan'
                onBackPress={() => {
                    navigation.navigate('Add Transaction');
                }}
            />
            <View style={{ marginTop: 10, gap: 1 }}>
                <FlatList
                    data={LoanList}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <LoanCard onSelect={() => handleSelectLoan(item)} loan={item} />}
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

export default SelectLoanForm