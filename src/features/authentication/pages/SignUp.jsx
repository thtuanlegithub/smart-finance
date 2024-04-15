import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import SignInButton from '../components/SignInButton';
import SignInInput from '../components/SignInInput';
import { isValidAccount } from '../../../utils/validateAccount';

function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleSignUp = async () => {
        if (isValidAccount(email, password)) {
            try {
                const userCredential = await auth().createUserWithEmailAndPassword(email, password);
                if (userCredential) {
                    alert('Account created successfully! Please sign in to explore more features.');
                    navigation.goBack();
                }
            } catch (error) {
                alert(error.message);
            }
        }
    };

    return (
        <GestureHandlerRootView style={styles.signUpContainer}>
            <SignInInput
                placeholder="Email"
                value={email}
                onChangeText={(value) => setEmail(value)}
            />
            <SignInInput
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <SignInButton title="Sign Up" onPress={handleSignUp} />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    signUpContainer: {
        flex: 1,
        backgroundColor: 'white',
    }
})

export default SignUp;