import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AddTransactionInputViewHeader from '../../../../transaction/components/AddTransactionInputViewHeader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import typography from '../../../../../styles/typography';
import colors from '../../../../../styles/colors';
import ATimeRangeExpenseReport from '../../../components/ExpenseReport/ATimeRangeExpenseReport';
import { useTranslation } from 'react-i18next';

const TimeTab = createMaterialTopTabNavigator();

const ExpenseReport = (props) => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const reportTimeRanges = ['25/3/2024 - 31/3/2024', '1/4/2024 - 7/4/2024', 'last-week', 'this-week']
    return (
        <View style={{ position: 'relative', flex: 1 }}>
            <AddTransactionInputViewHeader
                title={t('expense-detail')}
                onBackPress={() => {
                    navigation.navigate("GeneralReport");
                }} />
            <TouchableOpacity
                style={styles.calendar}>
                <FontAwesome5 name="calendar-alt" size={24} color={colors.green07} solid />
            </TouchableOpacity>
            <TimeTab.Navigator
                screenOptions={{
                    tabBarPressColor: colors.gray02,
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: {
                        ...typography.MediumInterH5,
                        color: colors.green07,
                        textTransform: 'none',
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
                            name={t(range).toUpperCase()}
                            initialParams={{ range }}>
                            {
                                props => <ATimeRangeExpenseReport {...props} type={props.route.name} />
                            }
                        </TimeTab.Screen>
                    ))
                }
            </TimeTab.Navigator>
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