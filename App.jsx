import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/pages/Home';
import Setting from './src/pages/Setting';
import { Modal, StyleSheet, Text, Touchable, TouchableHighlight, TouchableHighlightBase, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Transaction from './src/pages/Transaction';
import Budget from './src/pages/Budget';
const Tab = createBottomTabNavigator();
const CenterButton = ({ onDisplayModal }) => {
  const handlePress = () => {
    if (onDisplayModal) {
      onDisplayModal();
    }
  }
  return (
    <TouchableOpacity onPress={handlePress} style={styles.centerButtonContainer}>
      <View style={styles.centerButton}>
        <Ionicons name='add' size={28} color='#FFFFFF' />
      </View>
    </TouchableOpacity>
  )
}
const NullComponent = () => {
  return (
    <View></View>
  )
}
function App(props) {
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
            tabBarOptions={{
              activeTintColor: 'green',
              inactiveTintColor: 'gray',
            }}
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
    </GestureHandlerRootView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  centerButtonContainer: {
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    position: 'absolute',
    backgroundColor: 'green',
    height: 48,
    width: 48,
    borderRadius: 24,
    bottom: 24,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default App;