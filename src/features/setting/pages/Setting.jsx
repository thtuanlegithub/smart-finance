import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { clearUser } from '../../authentication';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { emailPasswordSignOut, googleSignOut } from '../../authentication';
import ConfirmDialog from '../../../components/ConfirmDialog';

function Setting(props) {
    const dispatch = useDispatch();
    const [dialogVisible, setDialogVisible] = useState(false);

    const handleSignOut = async () => {
        const user = auth().currentUser;
        if (user) {
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
            <Button title='Log out' onPress={() => setDialogVisible(true)} />
            <ConfirmDialog
                visible={dialogVisible}
                title="Confirm Logout"
                message="Are you sure you want to logout?"
                onConfirm={handleSignOut}
                onCancel={() => setDialogVisible(false)}
            />
        </View>
    );
}

export default Setting;