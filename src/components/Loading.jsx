import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import colors from '../styles/colors';

const Loading = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.green07} />
    </View>
);

export default Loading;