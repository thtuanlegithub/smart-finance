import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native'
import colors from '../../../styles/colors'
import typography from '../../../styles/typography';
import React from 'react'
import SemiCircularProgress from '../../../components/SemiCircularProgress'
import SavingCard from './SavingCard';

const savingList = [{
    id: '1',
    category: 'Shopping',
    dueDay: '31/03/2024',
    saving: 2200000,
    current: 1500000,
},
{
    id: '2',
    category: 'Food & Beverage',
    dueDay: '31/03/2024',
    saving: 2000000,
    current: 500000,
},
{
    id: '3',
    category: 'Transportation',
    dueDay: '31/03/2024',
    saving: 300000,
    current: 300000,
}];

const SavingList = () => {
    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <View style={{ backgroundColor: 'white', paddingBottom: 16 }}>
                        <View style={styles.savingBudgetQuickReport}>
                            <SemiCircularProgress
                                fill={70}
                                mainColor={colors.green07}
                                subColor={colors.green02}
                                labelTextColor={colors.green08}
                                contentTextColor={colors.green07}
                            />
                        </View>
                        <View style={styles.createNewBudgetContainer}>
                            <TouchableOpacity style={styles.btnCreateNewBudget}>
                                <Text style={{ ...typography.MediumInterH5, color: 'white' }}>Create new saving</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                data={savingList}
                renderItem={({ item }) => <SavingCard {...item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    savingBudgetQuickReport: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 16,
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

export default SavingList