import auth from '@react-native-firebase/auth'; 
import { SignInStrategy } from '../../../patterns';

export default class emailPasswordSignIn extends SignInStrategy {
    constructor(email, password) {
        super();
        this.email = email;
        this.password = password;
    }

    async signIn() {
        try {
            return await auth().signInWithEmailAndPassword(this.email, this.password);
        } catch (error) {
            console.error(error);
            throw error; 
        }
    }
}

export const emailPasswordSignOut = async () => {   
    try {
        await auth().signOut();
    } catch (error) {
        console.error(error);
    }   
};

export const isEmailPasswordSignedIn = () => {
    return new Promise((resolve) => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};

export const getCurrentUser = () => {
    return auth().currentUser;
}