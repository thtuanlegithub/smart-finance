import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import typography from '../../../styles/typography'
import formatCurrency from '../../../utils/formatCurrency'
import colors from '../../../styles/colors'
import InvestmentCard from './InvestmentCard'
const investmentList = [
    {
        id: '1',
        name: 'Investment 1',
        totalInterest: 2450000,
        principal: 10000000,
        type: 'fixed',
        dueDay: '31/03/2024',
    },
    {
        id: '2',
        name: 'Investment 2',
        totalInterest: 24500000,
        principal: 10000000,
        type: 'dynamic',
        dueDay: '31/03/2024',
    },
    {
        id: '3',
        name: 'Investment 3',
        totalInterest: 245000,
        principal: 1000000,
        type: 'fixed',
        dueDay: '31/03/2024',
    },
    {
        id: '4',
        name: 'Investment 4',
        totalInterest: 2450000,
        principal: 1000000,
        type: 'dynamic',
        dueDay: '31/03/2024',
    },
    {
        id: '5',
        name: 'Investment 5',
        totalInterest: 2450000,
        principal: 1000000,
        type: 'dynamic',
        dueDay: '31/03/2024',
    },
]

const InvestmentList = () => {
    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <View style={{ backgroundColor: 'white', paddingBottom: 16 }}>
                        <View style={styles.investmentQuickReport}>
                            <Text style={{ ...typography.MediumInterH4, color: colors.green08 }}>Total interest this time:</Text>
                            <Text style={{ ...typography.SemiBoldInterH4, color: colors.green07 }}>{formatCurrency(24500000)}</Text>
                        </View>
                        <View style={styles.createNewBudgetContainer}>
                            <TouchableOpacity style={styles.btnCreateNewBudget}>
                                <Text style={{ ...typography.MediumInterH5, color: 'white' }}>New investment</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                data={investmentList}
                renderItem={({ item }) => <InvestmentCard {...item} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    investmentQuickReport: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
    },
    createNewBudgetContainer: {
        alignItems: 'flex-end',
        paddingHorizontal: 16,
    },
    btnCreateNewBudget: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.green06,
        borderRadius: 24,
    }
})

export default InvestmentList