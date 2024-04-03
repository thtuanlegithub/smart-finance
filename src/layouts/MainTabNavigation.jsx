import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../pages/Home';
import Setting from '../pages/Setting';
import Transaction from '../pages/Transaction';
import Budget from '../pages/Budget';
import NullComponent from '../components/NullComponent';
import CenterButton from '../components/CenterButton';
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
                            tabBarActiveTintColor: 'green',
                            tabBarInactiveTintColor: 'gray',
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;
                                if (route.name === 'Home') {
                                    iconName = focused ? 'home' : 'home-outline';
                                } else if (route.name === 'Setting') {
                                    iconName = focused ? 'settings' : 'settings-outline';
                                } else if (route.name === 'Transaction') {
                                    iconName = focused ? 'cash' : 'cash-outline';
                                }
                                else if (route.name == 'Budget') {
                                    iconName = focused ? 'wallet' : 'wallet-outline';
                                }
                                return <Ionicons name={iconName} size={size} color={color} />;
                            },
                            tabBarStyle: {
                                height: 56,
                                paddingTop: 5
                            },
                            tabBarLabelStyle: {
                                fontSize: 12,
                                padding: 5,
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
                    {/* <Text>{props.user}</Text> */}
                </View>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
})
export default MainTabNavigation