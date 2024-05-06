import { View, Text } from 'react-native'
import React from 'react'
import StackHeader from '../../../components/StackHeader'
import { useTranslation } from 'react-i18next';

const SettingCurrency = () => {
    const { t } = useTranslation();
    return (
        <View>
            <StackHeader title={t('currency-unit')} />
        </View>
    )
}

export default SettingCurrency