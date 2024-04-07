import React from 'react';
import { View, Text, Button } from 'react-native';
import { clearUser } from '../../authentication';
import { useDispatch } from 'react-redux';

function Setting(props) {
    const dispatch = useDispatch();
    const handleSignOut = () => {
        dispatch(clearUser());
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
            <Button title='Log out' onPress={handleSignOut} />
        </View>
    );
}

export default Setting;