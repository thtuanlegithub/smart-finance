import React from 'react';
import { View, Text, Image } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';

const NoWifiItem = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../assets/images/noWifiIcon.png')} />
        <Text style={[typography.SemiBoldInterH3, { color: colors.green06, marginVertical: 8 }]}>No Internet</Text>
        <Text style={[typography.MediumInterH4, { color: colors.green07 }]}>Please check your internet connection</Text>
    </View>
);

export default NoWifiItem;