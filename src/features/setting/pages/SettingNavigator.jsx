import { View, Text } from 'react-native'
import React from 'react'
import { CardStyleInterpolators, TransitionSpecs, createStackNavigator } from '@react-navigation/stack';
import SettingMain from './SettingMain';

const SettingStack = createStackNavigator();

const SettingNavigator = () => {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        }
      }}>
      <SettingStack.Screen name='Setting Main' component={SettingMain} />
    </SettingStack.Navigator>
  )
}

export default SettingNavigator