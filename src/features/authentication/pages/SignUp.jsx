import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import SignInButton from '../components/SignInButton';
import SignInInput from '../components/SignInInput';

function SignUp(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleSignUp = async () => {
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            // Signed in 
            const user = userCredential;
            console.log(user);
            // ...
        } catch (error) {
            alert(error);
            console.error(error);
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