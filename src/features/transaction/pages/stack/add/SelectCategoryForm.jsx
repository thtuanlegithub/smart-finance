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
import { setTransactionType } from '../../../services/addTransactionFormSlice';
import { setCurrentCategory } from '../../../../category/services/categorySlice';
import transactionType from '../../../data/transactionType';

const Tab = createMaterialTopTabNavigator();

const SelectCategoryForm = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const type = useSelector(state => state.addTransactionForm.type);
    const handleSelectExpenseCategory = (category) => {
        dispatch(setTransactionType(transactionType.EXPENSE));
        dispatch(setCurrentCategory(category));
        navigation.goBack();
    }
    const handleSelectIncomeCategory = (category) => {
        dispatch(setTransactionType(transactionType.INCOME));
        dispatch(setCurrentCategory(category));
        navigation.goBack();
    }
    const handleSelectDebtLoanCategory = (category) => {
        dispatch(setTransactionType(transactionType.DEBT_LOAN));
        dispatch(setCurrentCategory(category));
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <AddTransactionInputViewHeader title='Select Category'
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
                    <Tab.Screen name="Expense">
                        {props => <ExpenseSelectCategoryList {...props} onCategorySelect={handleSelectExpenseCategory} />}
                    </Tab.Screen>
                    <Tab.Screen name="Income">
                        {props => <IncomeSelectCategoryList {...props} onCategorySelect={handleSelectIncomeCategory} />}
                    </Tab.Screen>
                    <Tab.Screen name="Debt/ Loan">
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