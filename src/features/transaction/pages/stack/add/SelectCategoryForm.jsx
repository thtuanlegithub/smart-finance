import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import { StyleSheet, View } from 'react-native';
import AddTransactionInputViewHeader from '../../../components/AddTransactionInputViewHeader';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../../../styles/colors';
import typography from '../../../../../styles/typography';
import ExpenseSelectCategoryList from '../../../../category/components/ExpenseSelectCategoryList';
import IncomeSelectCategoryList from '../../../../category/components/IncomeSelectCategoryList';
import DebtLoanSelectCategoryList from '../../../../category/components/DebtLoanSelectCategoryList';
import { useDispatch, useSelector } from 'react-redux';
import { setTransactionCategory, setTransactionType } from '../../../services/addTransactionFormSlice';
import { setCurrentCategory } from '../../../../category/services/categorySlice';
import transactionType from '../../../data/transactionType';
import { setUpdateTransactionCategory, setUpdateTransactionType } from '../../../services/updateTransactionFormSlice';
import { useTranslation } from 'react-i18next';

const Tab = createMaterialTopTabNavigator();

const SelectCategoryForm = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const type = useSelector(state => state.addTransactionForm.type);
    const currentTransactionCRUDAction = useSelector(state => state.transaction.currentTransactionCRUDAction)
    const handleSelectExpenseCategory = (category) => {
        if (currentTransactionCRUDAction == 'create') {
            dispatch(setTransactionType(transactionType.EXPENSE));
            dispatch(setTransactionCategory(category.id));
        }
        else if (currentTransactionCRUDAction == 'update') {
            dispatch(setUpdateTransactionType(transactionType.EXPENSE));
            dispatch(setUpdateTransactionCategory(category.id));
        }
        dispatch(setCurrentCategory(category));
        navigation.goBack();
    }
    const handleSelectIncomeCategory = (category) => {
        if (currentTransactionCRUDAction == 'create') {
            dispatch(setTransactionType(transactionType.INCOME));
            dispatch(setTransactionCategory(category.id));
        }
        else if (currentTransactionCRUDAction == 'update') {
            dispatch(setUpdateTransactionType(transactionType.INCOME));
            dispatch(setUpdateTransactionCategory(category.id));
        }
        dispatch(setCurrentCategory(category));
        navigation.goBack();
    }
    const handleSelectDebtLoanCategory = (category) => {
        if (currentTransactionCRUDAction == 'create') {
            dispatch(setTransactionType(transactionType.DEBT_LOAN));
            dispatch(setTransactionCategory(category.id));
        }
        else if (currentTransactionCRUDAction == 'update') {
            dispatch(setUpdateTransactionType(transactionType.DEBT_LOAN));
            dispatch(setUpdateTransactionCategory(category.id));
        }
        dispatch(setCurrentCategory(category));
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <AddTransactionInputViewHeader title={t('select-category')}
                onBackPress={() => {
                    navigation.goBack();
                }} />
            <View style={styles.navBar}>
                <Tab.Navigator
                    initialRouteName={type ? type : 'Expense'}
                    screenOptions={{
                        animationEnabled: true,
                        tabBarPressColor: colors.gray02,
                        tabBarIndicatorStyle: {
                            borderRadius: 10,
                            backgroundColor: 'white',
                            height: '100%',
                            borderWidth: 4,
                            borderColor: colors.gray02,
                        },
                        tabBarStyle: {
                            backgroundColor: colors.gray02,
                            marginHorizontal: 16,
                            borderRadius: 10,
                            marginVertical: 8,
                            elevation: 0,
                            height: 40,
                        },
                        tabBarItemStyle: {
                        },
                        tabBarLabelStyle: {
                            ...typography.MediumInterH6,
                            textTransform: 'capitalize',
                            justifyContent: 'center',
                            marginTop: -4,
                        },
                        tabBarActiveTintColor: colors.green09,
                        tabBarInactiveTintColor: colors.gray03,
                    }}
                >
                    <Tab.Screen name={t('expense')}>
                        {props => <ExpenseSelectCategoryList {...props} onCategorySelect={handleSelectExpenseCategory} />}
                    </Tab.Screen>
                    <Tab.Screen name={t('income')}>
                        {props => <IncomeSelectCategoryList {...props} onCategorySelect={handleSelectIncomeCategory} />}
                    </Tab.Screen>
                    <Tab.Screen name={t('debt/loan')}>
                        {props => <DebtLoanSelectCategoryList {...props} onCategorySelect={handleSelectDebtLoanCategory} />}
                    </Tab.Screen>
                </Tab.Navigator>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    navBar: {
        borderTopWidth: 0.5,
        borderColor: colors.gray03,
        flex: 1,
        backgroundColor: 'white',
    }
})

export default SelectCategoryForm