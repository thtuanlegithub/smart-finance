import { View, Text } from 'react-native'
import React from 'react'

const LineProgressBar = (props) => {
    const fill = props.current / props.limit * 100;
    if (fill >= 75) {
        mainColor = colors.red05;
        subColor = colors.red04;
        labelTextColor = colors.red05;
        contentTextColor = colors.red02;
    }
    else if (fill >= 50) {
        mainColor = colors.orange04;
        subColor = colors.orange02;
        labelTextColor = colors.orange05;
        contentTextColor = colors.orange04;
    }
    else {
        mainColor = colors.green06;
        subColor = colors.green03;
        labelTextColor = colors.green08;
        contentTextColor = colors.green07;
    }
    const containerStyle = {
        height: 12,
        backgroundColor: subColor,
        borderRadius: 20,
    };

    const fillerStyle = {
        flex: 1,
        width: `${props.current / props.limit * 100} %`,
        backgroundColor: mainColor,
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