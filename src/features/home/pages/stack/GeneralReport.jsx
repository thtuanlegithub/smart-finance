import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AddTransactionInputViewHeader from '../../../transaction/components/AddTransactionInputViewHeader'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import typography from '../../../../styles/typography'
import colors from '../../../../styles/colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ATimeRangeGeneralReport from '../../components/ATimeRangeGeneralReport'
import { useTranslation } from 'react-i18next'

const TimeTab = createMaterialTopTabNavigator();

const GeneralReport = (props) => {
    const { t } = useTranslation(); 
    const reportTimeRanges = ['25/3/2024 - 31/3/2024', '1/4/2024 - 7/4/2024', 'Last week', 'This week']
    return (
        <View style={styles.container}>
            <AddTransactionInputViewHeader
                backContent={t('close')}
                title={t('detail-report')}
                onBackPress={() => {
                    props.handleDisplayBottomSheetReport(false);
                }}
            />
            <TouchableOpacity
                style={styles.calendar}>
                <FontAwesome5 name="calendar-alt" size={24} color={colors.green07} solid />
            </TouchableOpacity>
            <TimeTab.Navigator
                screenOptions={{
                    tabBarPressColor: colors.gray02,
                    tabBarScrollEnabled: true,
                    tabBarLabelStyle: {
                        ...typography.MediumInterH5,
                        color: colors.green07,
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: colors.green07,
                    },
                    tabBarItemStyle: {
                        width: 'auto',
                    },
                    tabBarStyle: {
                        shadowColor: "#FFF",
                        borderBottomWidth: 0.3,
                        borderBottomColor: colors.gray03,
                    }
                }}>
                {
                    reportTimeRanges.map((range, index) => (
                        <TimeTab.Screen
                            screenOptions={{
                            }}
                            key={index}
                            name={range}
                            initialParams={{ range }}>
                            {
                                props => <ATimeRangeGeneralReport {...props} type={props.route.name} />
                            }
                        </TimeTab.Screen>
                    ))
                }
            </TimeTab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    calendar: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 16,
    }
})

export default GeneralReport