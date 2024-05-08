import { createSlice } from "@reduxjs/toolkit";
import { SettingFields, FirebaseNodes } from "../../../data/firebaseConstant";
import { FirestoreSingleton } from "../../../patterns";
import { convertToDateTime } from "../../../utils/convertToDateTime";
import { getCurrentUser } from "../../authentication";
import { setReminderNotification } from "../utils/notification";
const firestoreInstance = FirestoreSingleton.getInstance().getFirestore();
const settingCollection = firestoreInstance.collection(FirebaseNodes.SETTING);
const usersCollection = firestoreInstance.collection(FirebaseNodes.USERS);

// Firebase services
async function getUserSetting(accountId) {
    const settings = await settingCollection.where(SettingFields.ACCOUNT_ID, '==', accountId).get();
    if (!settings.empty) {
        return settings.docs[0].data();
    } else {
        return null;
    }
}

async function updateUserSetting(settingId, newSetting) {
    const settingRef = settingCollection.doc(settingId);
    const doc = await settingRef.get();

    if (doc.exists) {
        await settingRef.update(newSetting);
    } else {
        const docRef = await settingCollection.add(newSetting);
        return docRef.id;
    }
}

function createUserSetting(accountId) {
    return {
        setting_id: '',
        notify_time: '20:00',
        language: 'en',
        account_id: accountId,
    };
}

export const loadReminders = async () => {
    const userRef = usersCollection.doc(getCurrentUser().uid);
    const doc = await userRef.get();
    const user = doc.data();

    if (doc.exists) {
        const user = doc.data();

        if (user && user.reminders) {
            const reminders = user.reminders;
            
            // Schedule notifications for each reminder
            reminders.forEach(reminder => {
                const { id, title, message, notify_time, date } = reminder;
                const reminderDate = convertToDateTime(date, notify_time);
                if (reminderDate > new Date()) {
                    console.log('Set reminder này: ', reminder);
                    setReminderNotification(reminder);
                }
            });
        }
    }
}

async function initiateUserSetting(currentUser, dispatch) {
    let setting = await getUserSetting(currentUser.uid);
    if (!setting) {
        const newSetting = createUserSetting(currentUser.uid);
        const settingId = await updateUserSetting('', newSetting);
        newSetting[SettingFields.SETTING_ID] = settingId;
        await updateUserSetting(settingId, newSetting);
        setting = newSetting;
    }
    dispatch(setSetting(setting));
}

const settingSlice = createSlice({
    name: 'setting',
    initialState: createUserSetting(''),
    reducers: {
        setSetting: (state, action) => {
            state[SettingFields.SETTING_ID] = action.payload[SettingFields.SETTING_ID];
            state[SettingFields.NOTIFICATION_TIME] = action.payload[SettingFields.NOTIFICATION_TIME];
            state[SettingFields.LANGUAGE] = action.payload[SettingFields.LANGUAGE];
            state[SettingFields.ACCOUNT_ID] = action.payload[SettingFields.ACCOUNT_ID];
        },
        setSettingId: (state, action) => {
            state[SettingFields.SETTING_ID] = action.payload;
        },
        setNotificationTime: (state, action) => {
            state[SettingFields.NOTIFICATION_TIME] = action.payload;
        },
        setLanguage: (state, action) => {
            state[SettingFields.LANGUAGE] = action.payload;
        },
        setAccountId: (state, action) => {
            state[SettingFields.ACCOUNT_ID] = action.payload;
        },
    },
});

export {
    getUserSetting,
    createUserSetting,
    updateUserSetting,
    initiateUserSetting,
};
export const {
    setSettingId,
    setNotificationTime,
    setLanguage,
    setAccountId,
    setSetting,
} = settingSlice.actions;
export default settingSlice.reducer;