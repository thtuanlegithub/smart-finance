import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native'
import colors from '../../../styles/colors'
import typography from '../../../styles/typography'; import React from 'react'
import SemiCircularProgress from '../../../components/SemiCircularProgress'
import LimitCard from './LimitCard';

const limitList = [{
    id: '1',
    category: 'Shopping',
    dueDay: '31/03/2024',
    limit: 2200000,
    current: 1500000,
},
{
    id: '2',
    category: 'Food & Beverage',
    dueDay: '31/03/2024',
    limit: 2000000,
    current: 500000,
},
{
    id: '3',
    category: 'Transportation',
    dueDay: '31/03/2024',
    limit: 300000,
    current: 300000,
}];

const LimitList = () => {
    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <View style={{ backgroundColor: 'white', paddingBottom: 16 }}>
                        <View style={styles.limitBudgetQuickReport}>
                            <SemiCircularProgress
                                fill={70}
                                mainColor={colors.red05}
                                subColor={colors.red04}
                                labelTextColor={colors.red05}
                                contentTextColor={colors.red02} />
                        </View>
                        <View style={styles.createNewBudgetContainer}>
                            <TouchableOpacity style={styles.btnCreateNewBudget}>
                                <Text style={{ ...typography.MediumInterH5, color: 'white' }}>Create new limit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                data={limitList}
                renderItem={({ item }) => <LimitCard {...item} />}
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
    limitBudgetQuickReport: {
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
        backgroundColor: colors.red05,
        borderRadius: 24,
    }
})

export default LimitList