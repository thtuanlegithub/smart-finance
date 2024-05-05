import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native'
import colors from '../../../styles/colors'
import typography from '../../../styles/typography'; import React, { useEffect, useRef } from 'react'
import SemiCircularProgress from '../../../components/SemiCircularProgress'
import LimitCard from './LimitCard';
import { useDispatch, useSelector } from 'react-redux';
import { setAddLimitBottomSheetDisplay } from '../../limit';
import { useNavigation } from '@react-navigation/native';
import { setSelectedLimitItem } from '../services/budgetSlice';

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
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return (
        <>
            <View style={styles.container}>
                <FlatList
                    ListHeaderComponent={
                        <View style={{ backgroundColor: 'white', paddingBottom: 16 }}>
                            <View style={styles.limitBudgetQuickReport}>
                                <SemiCircularProgress
                                    fill={25}
                                    labelTextColor={colors.red05}
                                    contentTextColor={colors.red02} />
                            </View>
                            <View style={styles.createNewBudgetContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(setAddLimitBottomSheetDisplay(true))
                                    }}
                                    style={styles.btnCreateNewBudget}>
                                    <Text style={{ ...typography.MediumInterH5, color: 'white' }}>Create new limit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    data={limitList}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(setSelectedLimitItem(item))
                                navigation.navigate('Limit Detail', { ...item })
                            }}
                            style={{
                                paddingTop: 16,
                                paddingHorizontal: 16,
                            }}>
                            <LimitCard
                                {...item} />
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </>
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
        backgroundColor: colors.green07,
        borderRadius: 24,
    }
})

export default LimitList