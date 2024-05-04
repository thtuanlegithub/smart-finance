import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import SignInInput from '../components/SignInInput';
import SignInButton from '../components/SignInButton';
import { useDispatch } from 'react-redux';
import { getCurrentUser, setUser, emailPasswordSignIn } from '../../authentication';
import { isValidAccount } from '../../../utils/validateAccount';
import { googleSignIn } from '../../authentication';
import LoadingItem from '../../../components/LoadingItem';
import { loadReminders } from '../../setting';

function SignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSignIn = async () => {
        if (isValidAccount(email, password)) {
            try {
                setLoading(true);
                const strategy = new emailPasswordSignIn(email, password);
                const userCredential = await strategy.signIn();
                if (userCredential) {
                    dispatch(setUser(userCredential.user.toJSON()));
                    loadReminders();
                    setLoading(false);
                }
            } catch (error) {
                alert('Invalid account. Please try again!');
                setLoading(false);
            }
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const strategy = new googleSignIn();
            const result = await strategy.signIn();
            if (result === false) {
                setLoading(false);
                return;
            }
            const currentUser = getCurrentUser();
            if (currentUser) {
                dispatch(setUser(currentUser.toJSON()));
                setLoading(false);
            }
        } catch (error) {
            alert(error.message);            
        }
    };

    if (loading) {
        return <LoadingItem />;
    }

    return (
        <KeyboardAvoidingView
            // behavior={Platform.OS === "ios" ? "height" : "padding"}
            style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <Image style={styles.logInImage} source={require('../../../assets/images/loginIllustration.png')} />
            </View>
            <Text style={styles.loginTitle}>Sign in</Text>
            <Text style={styles.loginSubtitle}>Continue with your account to get started</Text>
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
            <View style={styles.signUpContainer}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
                    <Text style={styles.signUpLinkLabel}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <TouchableHighlight
                onPress={handleGoogleSignIn}
                underlayColor="#E4E6E3"
                style={styles.continueWithGoogleContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.googleLogo} source={require('../../../assets/images/google.png')} />
                    <Text style={styles.continueWithOtherSocialNetwork}>Or Continue with your Gmail</Text>
                </View>
            </TouchableHighlight>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    logInImage: {
        marginTop: -40,
        marginBottom: 20,
        height: 150,
        width: 150,
    },
    signUpContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpLinkLabel: {
        color: '#365545',
        paddingLeft: 5,
        paddingVertical: 10,
        fontWeight: 'bold'
    },
    continueWithOtherSocialNetwork: {
        textAlign: 'center',
    },
    googleLogo: {
        height: 24,
        width: 24,
        marginRight: 10
    },
    continueWithGoogleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#EEEFED',
        paddingVertical: 12,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    loginTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#365545'
    },
    loginSubtitle: {
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 0,
        fontSize: 16,
        color: 'gray',
        color: '#365545'
    }
})
export default SignIn;