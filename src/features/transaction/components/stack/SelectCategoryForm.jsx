import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import { StyleSheet, View } from 'react-native';
import AddTransactionInputViewHeader from '../AddTransactionInputViewHeader';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../../styles/colors';
import typography from '../../../../styles/typography';
import ExpenseSelectCategoryList from './ExpenseSelectCategoryList';
import IncomeSelectCategoryList from './IncomeSelectCategoryList';
import DebtLoanSelectCategoryList from './DebtLoanSelectCategoryList';

const Tab = createMaterialTopTabNavigator();

const SelectCategoryForm = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <AddTransactionInputViewHeader title='Select Category'
                onBackPress={() => {
                    navigation.goBack();
                }} />
            <View style={styles.navBar}>
                <Tab.Navigator
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
                    <Tab.Screen name="Expense" component={ExpenseSelectCategoryList} />
                    <Tab.Screen name="Income" component={IncomeSelectCategoryList} />
                    <Tab.Screen name="Debt/ Loan" component={DebtLoanSelectCategoryList} />
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