import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import CategoryReport from './CategoryReport';
import { NavigationContainer } from '@react-navigation/native';
import TimeReport from './TimeReport';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createMaterialTopTabNavigator();

const ATimeRangeReport = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            paddingVertical: 8
        }}>
            <NavigationContainer
                independent={true}>
                <Tab.Navigator
                    initialRouteName='Bar'
                    screenOptions={{
                        animationEnabled: true,
                        tabBarPressColor: colors.gray02,
                        tabBarIndicatorStyle: {
                            borderRadius: 10,
                            backgroundColor: 'white',
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: colors.gray02,
                            height: '100%',
                            width: 50,
                        },
                        tabBarStyle: {
                            backgroundColor: colors.gray02,
                            marginHorizontal: 150,
                            borderRadius: 10,
                            elevation: 2,
                            marginTop: 2,
                            width: 100
                        },
                        tabBarLabelStyle: {
                            ...typography.MediumInterH5,
                            textTransform: 'capitalize',
                            justifyContent: 'center',
                        },
                        tabBarActiveTintColor: colors.green08,
                        tabBarInactiveTintColor: colors.gray03,
                    }}>
                    <Tab.Screen
                        options={{
                            tabBarLabel: () => <FontAwesome5 name="chart-bar" size={20} color={colors.green08} solid />,
                        }}
                        name="Bar"
                        component={TimeReport} />
                    <Tab.Screen
                        options={{
                            tabBarLabel: () => <FontAwesome5 name="chart-pie" size={20} color={colors.green08} solid />,
                        }}
                        name="Pie"
                        component={CategoryReport} />
                </Tab.Navigator>
            </NavigationContainer>
        </View>

    )
}

export default ATimeRangeReport