import React from 'react';
import { StyleSheet } from 'react-native';
import { View, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const CenterButton = ({ onDisplayModal }) => {
    const handlePress = () => {
        if (onDisplayModal) {
            onDisplayModal();
        }
    }
    return (
        <TouchableOpacity onPress={handlePress}
            style={styles.centerButtonContainer}>
            <View style={styles.centerButton}>
                <FontAwesome5 name='plus' size={28} color='#FFFFFF' />
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    centerButtonContainer: {
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerButton: {
        position: 'absolute',
        backgroundColor: '#40916C',
        height: 48,
        width: 48,
        borderRadius: 24,
        bottom: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
export default CenterButton;