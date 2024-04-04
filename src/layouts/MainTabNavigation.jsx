import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from '../pages/Home';
import Setting from '../pages/Setting';
import Transaction from '../pages/Transaction';
import Budget from '../pages/Budget';
import NullComponent from '../components/NullComponent';
import CenterButton from '../components/CenterButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../styles/colors';
const Tab = createBottomTabNavigator();
const MainTabNavigation = (props) => {
    const modalizeRef = useRef(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <View style={styles.container}>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarActiveTintColor: colors.green06,
                            // tabBarInactiveTintColor: '#ABC3B9',
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;
                                let iconStyle = focused ? 'solid' : 'regular';
                                let iconOpacity = focused ? 1 : 0.5;
                                if (route.name === 'Home') {
                                    iconName = 'home';
                                } else if (route.name === 'Setting') {
                                    iconName = 'user-cog';
                                } else if (route.name === 'Transaction') {
                                    iconName = 'money-check-alt';
                                } else if (route.name == 'Budget') {
                                    iconName = 'wallet';
                                }
                                let validIconStyle = typeof iconStyle === 'string' ? {} : iconStyle;
                                return <FontAwesome5 name={iconName} size={24} color={color} style={{ ...validIconStyle, opacity: iconOpacity }} />;
                            },
                            tabBarLabel: ({ focused, color }) => {
                                let labelName;
                                let labelOpacity = focused ? 1 : 0.5;
                                if (route.name === 'Home') {
                                    labelName = 'Home';
                                } else if (route.name === 'Setting') {
                                    labelName = 'Setting';
                                } else if (route.name === 'Transaction') {
                                    labelName = 'Transactions';
                                } else if (route.name == 'Budget') {
                                    labelName = 'Budgets';
                                }

                                return <Text style={{ color, opacity: labelOpacity, fontSize: 12, padding: 5 }}>{labelName}</Text>;
                            },
                            tabBarStyle: {
                                height: 60,
                                paddingTop: 5
                            }
                        })}
                    >
                        <Tab.Screen
                            name="Home"
                            component={Home}
                            options={{
                                headerShown: false,
                            }} />
                        <Tab.Screen
                            name="Transaction"
                            component={Transaction}
                            options={{
                                headerShown: false
                            }} />
                        <Tab.Screen
                            name="Center"
                            component={NullComponent}
                            options={{ tabBarButton: () => <CenterButton onDisplayModal={onOpen} /> }}
                        />
                        <Tab.Screen
                            name="Budget"
                            component={Budget}
                            options={{
                                headerShown: false
                            }} />
                        <Tab.Screen
                            name="Setting"
                            component={Setting}
                            options={{
                                headerShown: false
                            }} />
                    </Tab.Navigator>
                    <Modalize
                        adjustToContentHeight={true}
                        ref={modalizeRef}>
                        <View style={{ height: 700, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Helo</Text>
                        </View>
                    </Modalize>
                </View>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.gray02,
        flex: 1,
        justifyContent: 'center',
    },
})
export default MainTabNavigation