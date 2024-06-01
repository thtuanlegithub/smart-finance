import { FirestoreSingleton } from "../../../../../patterns";
import { getCurrentUser } from "../../../../authentication";

const firestoreInstance = FirestoreSingleton.getInstance().getFirestore();

const getAllNotifications = async () => { 
    const currentUser = getCurrentUser();
    const notificationRef = firestoreInstance.collection('users').doc(currentUser.uid).collection('notifications');
    const snapshot = await notificationRef.get();
    return snapshot.docs.map(doc => doc.data());
}

const addNewNotification = async (newNotification) => {
    const currentUser = getCurrentUser();
    const notificationRef = firestoreInstance.collection('users').doc(currentUser.uid).collection('notifications');
    await notificationRef.add(newNotification);
}

export {
    addNewNotification,
    getAllNotifications
}
