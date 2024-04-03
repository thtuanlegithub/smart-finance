import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const SignInInput = (props) => {
    const [isFocused, setFocus] = useState(false);

    return (
        <TextInput
            style={[
                styles.signInInput,
                { borderColor: isFocused ? '#1C322D' : 'gray' },
                { borderWidth: isFocused ? 2 : 1 },
                { paddingVertical: isFocused ? 9 : 10 }
            ]}
            placeholder={props.placeholder}
            placeholderTextColor={isFocused ? '#1C322D' : 'gray'}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            secureTextEntry={props.secureTextEntry}
            onChangeText={props.onChangeText}
            value={props.value}

        />
    );
};

const styles = StyleSheet.create({
    signInInput: {
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 14,
        marginHorizontal: 16,
        marginTop: 16,
        backgroundColor: "#F4F5F3",
    },
});

export default SignInInput;