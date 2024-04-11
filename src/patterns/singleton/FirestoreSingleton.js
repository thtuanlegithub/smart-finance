import firestore from '@react-native-firebase/firestore';

class FirestoreSingleton {
    static instance = null;
    firestore = null;

    static getInstance() {
        if (!FirestoreSingleton.instance) {
            FirestoreSingleton.instance = new FirestoreSingleton();
        }
        return FirestoreSingleton.instance;
    }

    constructor() {
        if (!this.firestore) {
            this.initializeFirestore();
        }
    }

    initializeFirestore() {
        this.firestore = firestore();
    }

    getFirestore() {
        return this.firestore;
    }
}

export default FirestoreSingleton;
