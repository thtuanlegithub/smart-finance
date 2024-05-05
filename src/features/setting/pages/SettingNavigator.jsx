import React from 'react'
import { CardStyleInterpolators, TransitionSpecs, createStackNavigator } from '@react-navigation/stack';
import SettingMain from './SettingMain';
import SettingWallet from './SettingWallet';
import SettingCategory from './SettingCategory';
import SettingCurrency from './SettingCurrency';
import SettingLanguage from './SettingLanguage';
import AboutUs from './AboutUs';
import SettingReminder from './SettingReminder';
import { Setting } from '../../../models';
import AddWallet from './AddWallet';
import UpdateWallet from './UpdateWallet';

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
      <SettingStack.Screen name='SettingMain' component={SettingMain} />
      <SettingStack.Screen name='SettingWallet' component={SettingWallet} />
      <SettingStack.Screen name='AddWallet' component={AddWallet} />
      <SettingStack.Screen name='UpdateWallet' component={UpdateWallet} />
      <SettingStack.Screen name='SettingCategory' component={SettingCategory} />
      <SettingStack.Screen name='SettingReminder' component={SettingReminder} />
      <SettingStack.Screen name='SettingCurrency' component={SettingCurrency} />
      <SettingStack.Screen name='SettingLanguage' component={SettingLanguage} />
      <SettingStack.Screen name='AboutUs' component={AboutUs} />
    </SettingStack.Navigator>
  )
}

export default SettingNavigator