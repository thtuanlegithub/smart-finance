import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { clearUser } from '../../authentication';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { emailPasswordSignOut, googleSignOut } from '../../authentication';
import ConfirmDialog from '../../../components/ConfirmDialog';
import SignOutButton from '../components/SignOutButton';
import typography from '../../../styles/typography';
import colors from '../../../styles/colors';
import SettingButton from '../components/SettingButton';
import { useNavigation } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import { useTranslation } from 'react-i18next';

function SettingMain(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const user = useSelector(state => state.login.user);
    const [confirmSignOutDialogVisible, setConfirmSignOutDialogVisible] = useState(false);

    const handleSignOut = async () => {
        const user = auth().currentUser;
        if (user) {
            const providerId = user.providerData[0].providerId;
            if (providerId === 'password') {
                await emailPasswordSignOut();
            } else if (providerId === 'google.com') {
                await googleSignOut();
            }
            PushNotification.cancelAllLocalNotifications();
            dispatch(clearUser());
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.profileImage} source={require('../../../assets/images/avatar.png')} />
            <Text style={styles.displayEmail}>{user.email}</Text>
            <View style={styles.buttonsGroup}>
                <SettingButton
                    onPress={() => navigation.navigate("SettingWallet")}
                    icon='wallet' title={t('my-wallets')} />
                <SettingButton
                    onPress={() => navigation.navigate("SettingCategory")}
                    icon='coins' title={t('category')} />
                <SettingButton
                    onPress={() => navigation.navigate("SettingReminder")}
                    icon='clock' title={t('reminder')} />
            </View>
            <View style={styles.buttonsGroup}>
                <SettingButton
                    onPress={() => navigation.navigate("SettingCurrency")}
                    icon='money-bill' title={t('currency-unit')} />
                <SettingButton
                    onPress={() => navigation.navigate("SettingLanguage")}
                    icon='globe-americas' title={t('language')} />
            </View>
            <View style={styles.buttonsGroup}>
                <SettingButton
                    onPress={() => navigation.navigate("AboutUs")}
                    icon='info-circle' title={t('about-us')} />
            </View>
            <View style={styles.buttonsGroup}>
            </View>
            <SignOutButton onPress={() => setConfirmSignOutDialogVisible(true)} />
            <ConfirmDialog
                visible={confirmSignOutDialogVisible}
                onCancel={() => setConfirmSignOutDialogVisible(false)}
                onConfirm={handleSignOut}
                title={t('sign-out-title')}
                message={t('sign-out-message')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    },
    profileImage: {
        height: 100,
        width: 100,
        marginTop: 32,
        marginBottom: 4,
    },
    displayEmail: {
        ...typography.MediumInterH4,
        color: colors.green07,
    },
    buttonsGroup: {
        marginTop: 24,
    }
})

export default SettingMain;