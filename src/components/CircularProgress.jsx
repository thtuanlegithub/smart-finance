import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import colors from '../styles/colors';
import typography from '../styles/typography';

const CircularProgress = (props) => {
    const size = 72;
    const strokeWidth = 11;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const fill = 77.8; // this should be the percentage of the progress (0 - 100)
    const progress = circumference - (fill / 100) * circumference;

    return (
        <View>
            <Svg width={size} height={size} style={{ transform: [{ rotateZ: '-90deg' }] }}>
                <Circle
                    stroke={props.subColor}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    stroke={props.mainColor}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={progress}
                    strokeLinecap="round"
                />
            </Svg>
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={[typography.SemiBoldInterH5, { color: props.textColor }]}>{fill}%</Text>
            </View>
        </View>
    );
};

export default CircularProgress;