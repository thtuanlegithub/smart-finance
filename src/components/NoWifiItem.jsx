import React from 'react';
import { View, Text } from 'react-native';
import colors from '../styles/colors';

const NoWifiItem = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>"No Internet Connection"</Text>
        <Text>"Please check your internet connection"</Text>
    </View>
);

export default NoWifiItem;