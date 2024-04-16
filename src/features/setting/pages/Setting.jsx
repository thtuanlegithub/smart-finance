import React from 'react';
import { View, Text, Button } from 'react-native';
import { clearUser } from '../../authentication';
import { useDispatch } from 'react-redux';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { emailPasswordSignOut, googleSignOut } from '../../authentication';

function Setting(props) {
    const dispatch = useDispatch();
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
            <Button title='Log out' onPress={handleSignOut} />
        </View>
    );
}

export default Setting;