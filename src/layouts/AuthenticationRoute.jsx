import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

const Stack = createStackNavigator();

const AuthenticationRoute = (props) => {
    const handleSignIn = (user) => {
        props.onSignIn(user);
    };
    return (
        <NavigationContainer initialRouteName="SignIn">
            <Stack.Navigator>
                <Stack.Screen name="SignIn">
                    {props => <SignIn {...props} onSignIn={handleSignIn} />}
                </Stack.Screen>
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default AuthenticationRoute