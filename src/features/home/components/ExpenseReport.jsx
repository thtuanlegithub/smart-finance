import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AddTransactionInputViewHeader from '../../transaction/components/AddTransactionInputViewHeader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import ATimeRangeExpenseReport from './ATimeRangeExpenseReport';

const TimeTab = createMaterialTopTabNavigator();

const ExpenseReport = (props) => {
    const navigation = useNavigation();
    const reportTimeRanges = ['25/3/2024 - 31/3/2024', '1/4/2024 - 7/4/2024', 'Last week', 'This week']
    return (
        <View style={{ position: 'relative', flex: 1 }}>
            <AddTransactionInputViewHeader
                title='Expense Detail'
                onBackPress={() => {
                    navigation.navigate("GeneralReport");
                }} />
            <TouchableOpacity
                style={styles.calendar}>
                <FontAwesome5 name="calendar-alt" size={24} color={colors.green07} solid />
            </TouchableOpacity>
            <NavigationContainer
                independent={true}>
                <TimeTab.Navigator
                    screenOptions={{
                        tabBarPressColor: colors.gray02,
                        tabBarScrollEnabled: true,
                        tabBarLabelStyle: {
                            ...typography.MediumInterH5,
                            color: colors.green07,
                        },
                        tabBarIndicatorStyle: {
                            backgroundColor: colors.green07,
                        },
                        tabBarItemStyle: {
                            width: 'auto',
                        },
                        tabBarStyle: {
                            shadowColor: "#FFF",
                            borderBottomWidth: 0.3,
                            borderBottomColor: colors.gray03,
                        }
                    }}>
                    {
                        reportTimeRanges.map((range, index) => (
                            <TimeTab.Screen
                                screenOptions={{
                                }}
                                key={index}
                                name={range}
                                initialParams={{ range }}>
                                {
                                    props => <ATimeRangeExpenseReport {...props} type={props.route.name} />
                                }
                            </TimeTab.Screen>
                        ))
                    }
                </TimeTab.Navigator>
            </NavigationContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    calendar: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 1
    }
})

export default ExpenseReport