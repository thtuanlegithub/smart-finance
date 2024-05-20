import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import typography from '../../../styles/typography'
import formatCurrency from '../../../utils/formatCurrency'
import colors from '../../../styles/colors'
import InvestmentCard from './InvestmentCard'
import { useDispatch } from 'react-redux'
import { setAddInvestmentBottomSheetDisplay } from '../../investment/services/addInvestmentSlice'
import { setCurrentInvestmentCRUDAction, setUpdateInvestmentBottomSheetDisplay } from '../../investment'
import { useTranslation } from 'react-i18next'
const investmentList = [
    {
      id: '6',
      name: 'Investment 6',
      totalInterest: 1500000,
      principal: 5000000,
      type: 'fixed',
      dueDay: '01/06/2025',
    },
    {
      id: '7',
      name: 'Investment 7',
      totalInterest: 8000000,
      principal: 20000000,
      type: 'dynamic',
      dueDay: '15/08/2024',
    },
    {
      id: '9',
      name: 'Investment 9',
      totalInterest: 5200000,
      principal: 18000000,
      type: 'dynamic',
      dueDay: '27/02/2025',
    },
    {
      id: '8',
      name: 'Investment 8',
      totalInterest: 350000,
      principal: 1200000,
      type: 'fixed',
      dueDay: '30/11/2023', 
    },
    {
      id: '10',
      name: 'Investment 10',
      totalInterest: 1700000,
      principal: 7000000,
      type: 'fixed',
      dueDay: '10/12/2024',
    },
  ];

const InvestmentList = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <View style={{ backgroundColor: 'white', paddingBottom: 16 }}>
                        <View style={styles.investmentQuickReport}>
                            <Text style={{ ...typography.MediumInterH4, color: colors.green08 }}>{t('total-interest-this-time')}: </Text>
                            <Text style={{ ...typography.SemiBoldInterH4, color: colors.green07 }}>{formatCurrency(24500000)}</Text>
                        </View>
                        <View style={styles.createNewBudgetContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    dispatch(setCurrentInvestmentCRUDAction('add'));
                                    dispatch(setAddInvestmentBottomSheetDisplay(true));
                                }}
                                style={styles.btnCreateNewBudget}>
                                <Text style={{ ...typography.MediumInterH5, color: 'white' }}>{t('new-investment')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                data={investmentList}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => {
                        dispatch(setCurrentInvestmentCRUDAction('update'));
                        dispatch(setUpdateInvestmentBottomSheetDisplay(true));
                    }
                    }>
                        <InvestmentCard {...item} />
                    </TouchableOpacity>
                }
                keyExtractor={item => item.id}
            />
        </View >
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