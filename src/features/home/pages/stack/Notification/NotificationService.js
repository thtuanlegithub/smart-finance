import { FirestoreSingleton } from "../../../../../patterns";
import { getCurrentUser } from "../../../../authentication";

const firestoreInstance = FirestoreSingleton.getInstance().getFirestore();

const getAllNotifications = async () => { 
    const currentUser = getCurrentUser();
    const notificationRef = firestoreInstance.collection('users').doc(currentUser.uid).collection('notifications');
    const snapshot = await notificationRef.get();
    const notifications = snapshot.docs.map(doc => doc.data()).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return notifications;
}

const addNewNotification = async (newNotification) => {
    const currentUser = getCurrentUser();
    const notificationRef = firestoreInstance.collection('users').doc(currentUser.uid).collection('notifications');
    const docRef = await notificationRef.add(newNotification);
    await docRef.update({ id: docRef.id });
}

const updateReadStatusNotification = async (notificationId) => {    
    const currentUser = getCurrentUser();
    const notificationRef = firestoreInstance.collection('users').doc(currentUser.uid).collection('notifications').doc(notificationId);
    await notificationRef.update({ read: true });
}

export {
    addNewNotification,
    getAllNotifications,
    updateReadStatusNotification,
}
