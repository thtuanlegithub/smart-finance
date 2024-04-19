import { View, Text } from 'react-native'
import React from 'react'

const LineProgressBar = (props) => {
    const containerStyle = {
        height: 16,
        backgroundColor: props.subColor,
        borderRadius: 20,
    };

    const fillerStyle = {
        flex: 1,
        width: `${props.current / props.limit * 100} %`,
        backgroundColor: props.mainColor,
        borderRadius: 20,
    };

    const completeStyle = {
        flex: 1,
        width: '100%',
        backgroundColor: props.completeColor,
        borderRadius: 20,
    }

    return (
        <View style={containerStyle}>
            {
                props.current < props.limit &&
                <View style={fillerStyle} />
                ||
                <View style={completeStyle} />
            }
        </View>
    );
}

export default LineProgressBar