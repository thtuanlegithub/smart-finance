import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '../../../../styles/colors';
import typography from '../../../../styles/typography';
import CategoryListReport from './CategoryListReport';
import TimeReport from './TimeReport';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createMaterialTopTabNavigator();

const ATimeRangeReport = (props) => {
    const transactions = props.transactions || [];
    
    return (
        <>
            {transactions.length > 0
            &&
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                paddingVertical: 8
            }}>
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
                        children={() => <TimeReport transactions={transactions} />}
                    />
                    <Tab.Screen
                        options={{
                            tabBarLabel: () => <FontAwesome5 name="chart-pie" size={20} color={colors.green08} solid />,
                        }}
                        name="Pie"
                        children={() => <CategoryListReport transactions={transactions} />}
                    />
                </Tab.Navigator>
            </View>
            }
            
        </>

    )
}

export default ATimeRangeReport