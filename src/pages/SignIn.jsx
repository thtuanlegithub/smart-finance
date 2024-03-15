import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import SignInInput from '../components/SignInInput';
import SignInButton from '../components/SignInButton';


function SignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            // Signed in 
            const user = userCredential.user;
            props.onSignIn(user); // Assuming you have a onSignIn prop to handle sign in
        } catch (error) {
            alert('Invalid email or password');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <SignInInput
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
            />
            <SignInInput
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <SignInButton title="Sign In" onPress={handleSignIn} />
            <SignInButton
                title="Sign Up"
                onPress={() => props.navigation.navigate('SignUp')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})
export default SignIn;