import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import StackHeader from '../../../../../components/StackHeader';
import colors from '../../../../../styles/colors';
import typography from '../../../../../styles/typography';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useTranslation} from 'react-i18next';
import {
  getAllNotifications,
  updateReadStatusNotification,
} from './NotificationService';

const Notification = () => {
  const {t} = useTranslation();
  const [notificationList, setNotificationList] = useState([]);
  const fetchNotification = async () => {
    const notificationList = await getAllNotifications();
    setNotificationList(notificationList);
  };
  const handleReadStatus = async item => {
    if (item.read !== true) {
      await updateReadStatusNotification(item.id);
      fetchNotification();
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StackHeader title={t('notification')} />
      <FlatList
        data={notificationList}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item}) => (
          <View style={{flex: 1, paddingHorizontal: 16}}>
            <TouchableOpacity
              onPress={() => handleReadStatus(item)}
              style={{
                ...styles.container,
                opacity: item.read === true ? 0.4 : 1,
              }}>
              <FontAwesome5
                color={colors.green06}
                size={20}
                name="bell"
                solid
              />
              <View
                style={{
                  gap: 4,
                }}>
                <Text
                  style={{
                    ...typography.SemiBoldInterH5,
                    color: colors.green06,
                    paddingHorizontal: 16,
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    ...typography.RegularInterH4,
                    color: colors.green08,
                    paddingHorizontal: 16,
                  }}>
                  {item.message}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{height: 1, backgroundColor: colors.gray01}}></View>
          </View>
        )}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
