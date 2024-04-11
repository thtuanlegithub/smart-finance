import React, { useRef, useMemo, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Button } from 'react-native';
import Home from '../features/home/pages/Home';
import Setting from '../features/setting/pages/Setting';
import Transaction from '../features/transaction/pages/Transaction';
import Budget from '../features/budget/pages/Budget';
import NullComponent from '../components/NullComponent';
import CenterButton from '../components/CenterButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../styles/colors';
import AddTransactionNavigator from '../features/transaction/components/AddTransactionNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const Tab = createBottomTabNavigator();
const CustomHandle = () => (
    <View style={styles.handle} />
);


const MainTabNavigation = (props) => {

    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['50%', '75%', '98%'], []);

    const handlePresentModalPress = () => {
        bottomSheetModalRef.current.present();
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
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
                                options={{ tabBarButton: () => <CenterButton onDisplayModal={handlePresentModalPress} /> }}
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
                        <BottomSheetModal
                            backdropComponent={BottomSheetBackdrop}
                            ref={bottomSheetModalRef}
                            snapPoints={snapPoints}
                            index={2}
                            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, opacity: 0 }}
                            handleComponent={CustomHandle} // Use the custom handle
                        >
                            <NavigationContainer independent={true}>
                                <AddTransactionNavigator />
                            </NavigationContainer>
                        </BottomSheetModal>
                    </View>
                </NavigationContainer>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.gray02,
        flex: 1,
        justifyContent: 'center',
    },
    handle: {
        backgroundColor: colors.gray03,
        opacity: 0.5,
        marginVertical: 5,
        height: 5,
        width: 50,
        borderRadius: 5,
        alignSelf: 'center',
        // marginTop: 10,
    },
})
export default MainTabNavigation