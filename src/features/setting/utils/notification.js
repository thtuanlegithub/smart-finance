import PushNotification from 'react-native-push-notification';
PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        // console.log('TOKEN:', token);
    },
    onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
    },

    onRegistrationError: function (err) {
        console.error(err.message, err);
    },

    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
});

PushNotification.createChannel(
    {
        channelId: "reminder",
        channelName: "Reminder", 
        channelDescription: "A channel to categorize your notifications", 
        playSound: true, 
        soundName: "default",
        importance: 4, 
        vibrate: true, 
    },
);

export const popUpNotification = (reminderAt) => {
    let date = new Date();
    const [hours, minutes] = reminderAt.split(':').map(Number);

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);

    if (date < new Date()) {
        date.setDate(date.getDate() + 1);
    }

    PushNotification.cancelAllLocalNotifications({id: 1000});
    PushNotification.localNotificationSchedule({
        id: 1000,
        channelId: 'reminder', 
        title: 'Reminder!', 
        message: 'Don\'t forget to add your spending for today!',
        date: date,
        repeatType: 'day', 
    });
};