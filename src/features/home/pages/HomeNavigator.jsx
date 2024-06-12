import React from 'react';
import { StyleSheet } from 'react-native';

import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack'
import Home from './Home';
import Notification from './stack/Notification/Notification';

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={
                {
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    transitionSpec: {
                        open: TransitionSpecs.TransitionIOSSpec,
                        close: TransitionSpecs.TransitionIOSSpec,
                    },
                }
            }>
      <HomeStack.Screen name="HomeScreen" component={Home} />
      <HomeStack.Screen name="Notification" component={Notification}/>
    </HomeStack.Navigator>
  )
}

export default HomeNavigator

const styles = StyleSheet.create({})