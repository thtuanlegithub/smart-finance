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

function SettingMain(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const [confirmSignOutDialogVisible, setConfirmSignOutDialogVisible] = useState(false);
    const handleSignOut = async () => {
        const user = auth().currentUser;
        if (user) {
            console.log(user);
            const providerId = user.providerData[0].providerId;
            if (providerId === 'password') {
                await emailPasswordSignOut();
            } else if (providerId === 'google.com') {
                await googleSignOut();
            }
            dispatch(clearUser());
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.profileImage} source={require('../../../assets/images/avatar.png')} />
            <Text style={styles.displayEmail}>{user.email}</Text>
            <View style={styles.buttonsGroup}>
                <SettingButton icon='wallet' title='My wallets' />
                <SettingButton icon='coins' title='Categories' />
                <SettingButton icon='clock' title='Reminder' />
            </View>
            <View style={styles.buttonsGroup}>
                <SettingButton icon='money-bill' title='Currency Unit' />
                <SettingButton icon='globe-americas' title='Languages' />
            </View>
            <View style={styles.buttonsGroup}>
                <SettingButton icon='info-circle' title='About us' />
            </View>
            <View style={styles.buttonsGroup}>
            </View>
            <SignOutButton onPress={() => setConfirmSignOutDialogVisible(true)} />
            <ConfirmDialog
                visible={confirmSignOutDialogVisible}
                onCancel={() => setConfirmSignOutDialogVisible(false)}
                onConfirm={handleSignOut}
                title="Sign out confirm"
                message={"Are you actually want to \n sign out?"}
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