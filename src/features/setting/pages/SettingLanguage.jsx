import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import StackHeader from '../../../components/StackHeader'
import { useTranslation } from 'react-i18next'
import FastImage from 'react-native-fast-image'
import { getLanguageIcon } from '../data/getLanguageIcon'
import typography from '../../../styles/typography'
import colors from '../../../styles/colors'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage, updateUserSetting } from '../services/settingSlice'
import i18next from 'i18next'
import { useNavigation } from '@react-navigation/native'

const SettingLanguage = () => {
    const { t } = useTranslation();
    const languageData = [{
        name: 'english',
        code: 'en'
    }, {
        name: 'vietnamese',
        code: 'vn'
    }];

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const userSetting = useSelector(state => state.setting);

    const handleSelectLanguage = (code) => {
        dispatch(setLanguage(code));
        i18next.changeLanguage(code);
        updateUserSetting(userSetting.setting_id, userSetting);
        navigation.goBack();
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <StackHeader title={t('language')} />
            <FlatList
                data={languageData}
                keyExtractor={item => item.code}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                handleSelectLanguage(item.code)
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 16,
                                alignItems: 'center',
                                gap: 8,
                                paddingHorizontal: 24,
                            }}>
                                <FastImage
                                    source={getLanguageIcon(item.code)}
                                    style={{
                                        width: 40,
                                        height: 30,
                                        borderRadius: 8,
                                        marginRight: 8,
                                    }}
                                />
                                <Text
                                    style={{
                                        ...typography.MediumInterH4,
                                        color: colors.green08
                                    }}>{t(item.name)}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View >
    )
}

export default SettingLanguage