import auth from '@react-native-firebase/auth'; 

export const emailPasswordSignIn = async (email, password) => {   
    try {
        return await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
        console.error(error);
        throw error; // Throw the error so it can be caught in handleSignIn
    }   
};

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