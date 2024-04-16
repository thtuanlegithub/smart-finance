import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
    webClientId: '929969100582-o5pg0c0httuosqeij1vtactjedbcglja.apps.googleusercontent.com',
});


export const googleSignIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        if (!userInfo) {
            console.log('User did not choose an account to sign in with');
            return false;
        } else {
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
            await auth().signInWithCredential(googleCredential);
        }
    } catch (error) {
        if (error.code === 'SIGN_IN_CANCELLED') {
            console.log('User cancelled the Google Sign In process');
            return false;
        }
        return false;
    }
};

export const isUserSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    return isSignedIn;
};

export const googleSignOut = async () => {
    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
    } catch (error) {
        console.error(error);
    }
};