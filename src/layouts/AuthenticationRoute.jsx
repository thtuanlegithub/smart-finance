import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const AuthenticationRoute = (props) => {
    return (
        <NavigationContainer initialRouteName="SignIn">
            <Stack.Navigator
                screenOptions={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                }}>
                <Stack.Screen name="SignIn"
                    options={{
                        headerShown: false
                    }}>
                    {props => <SignIn {...props} />}
                </Stack.Screen>
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default AuthenticationRoute