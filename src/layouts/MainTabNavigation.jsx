import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Button } from 'react-native';
import Home from '../features/home/pages/Home';
import NullComponent from '../components/NullComponent';
import CenterButton from '../components/CenterButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../styles/colors';
import AddTransactionNavigator from '../features/transaction/components/AddTransactionNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayModal } from '../features/transaction';
import CustomHandle from '../components/CustomHandle';
import { useSnapPoints } from '../hooks/useSnapPoints';
import TransactionNavigator from '../features/transaction/pages/TransactionNavigator';
import BudgetNavigator from '../features/budget/pages/BudgetNavigator';
import SettingMain from '../features/setting/pages/SettingMain';

const Tab = createBottomTabNavigator();



const MainTabNavigation = (props) => {

    const bottomSheetModalRef = useRef(null);
    const snapPoints = useSnapPoints();
    const displayModal = useSelector(state => state.addTransactionForm.displayModal);

    const dispatch = useDispatch();

    useEffect(() => {
        if (displayModal) {
            bottomSheetModalRef.current.present();
        }
        else {
            bottomSheetModalRef.current.dismiss();
        }
    }, [displayModal]);

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
                                component={TransactionNavigator}
                                options={{
                                    headerShown: false
                                }} />
                            <Tab.Screen
                                name="Center"
                                component={NullComponent}
                                options={{ tabBarButton: () => <CenterButton onDisplayModal={() => dispatch(setDisplayModal(true))} /> }}
                            />
                            <Tab.Screen
                                name="Budget"
                                component={BudgetNavigator}
                                options={{
                                    headerShown: false
                                }} />
                            <Tab.Screen
                                name="Setting"
                                component={SettingMain}
                                options={{
                                    headerShown: false
                                }} />
                        </Tab.Navigator>
                        <BottomSheetModal
                            onDismiss={() => dispatch(setDisplayModal(false))}
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
})
export default MainTabNavigation