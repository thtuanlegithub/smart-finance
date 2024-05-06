import { View, Text } from 'react-native'
import React from 'react'
import StackHeader from '../../../components/StackHeader'
import { useTranslation } from 'react-i18next'

const AboutUs = () => {
    const { t } = useTranslation();
    return (
        <View>
            <StackHeader
                title={t('about-us')}
            />
        </View>
    )
}

export default AboutUs