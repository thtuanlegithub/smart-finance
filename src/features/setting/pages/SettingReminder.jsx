import { View, Text } from 'react-native'
import React from 'react'
import StackHeader from '../../../components/StackHeader'
import { useTranslation } from 'react-i18next';

const SettingReminder = () => {
    const { t } = useTranslation();
    return (
        <View>
            <StackHeader title={t('reminder')} />
        </View>
    )
}

export default SettingReminder