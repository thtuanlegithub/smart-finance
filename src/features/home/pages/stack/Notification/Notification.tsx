import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import StackHeader from '../../../../../components/StackHeader';
import colors from '../../../../../styles/colors';
import typography from '../../../../../styles/typography';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useTranslation} from 'react-i18next';

enum NOTIFICATION_STATUS {
  READ = 'read',
  UNREAD = 'unread',
}

const NOTIFICATION_LIST = [
  {
    id: 1,
    title: 'Notification 1',
    description: 'Description 1',
    status: NOTIFICATION_STATUS.UNREAD,
  },
  {
    id: 2,
    title: 'Notification 2',
    description: 'Description 2',
    status: NOTIFICATION_STATUS.UNREAD,
  },
  {
    id: 3,
    title: 'Notification 3',
    description: 'Description 3',
    status: NOTIFICATION_STATUS.READ,
  },
  {
    id: 4,
    title: 'Notification 4',
    description: 'Description 4',
    status: NOTIFICATION_STATUS.READ,
  },
  {
    id: 5,
    title: 'Notification 5',
    description: 'Description 5',
    status: NOTIFICATION_STATUS.READ,
  },
  {
    id: 6,
    title: 'Notification 6',
    description: 'Description 6',
    status: NOTIFICATION_STATUS.READ,
  },
  {
    id: 7,
    title: 'Notification 7',
    description: 'Description 7',
    status: NOTIFICATION_STATUS.READ,
  },
  {
    id: 8,
    title: 'Notification 8',
    description: 'Description 8',
    status: NOTIFICATION_STATUS.READ,
  },
  {
    id: 9,
    title: 'Notification 9',
    description: 'Description 9',
    status: NOTIFICATION_STATUS.READ,
  },
  {
    id: 10,
    title: 'Notification 10',
    description: 'Description 10',
    status: NOTIFICATION_STATUS.READ,
  },
];

const Notification = () => {
  const {t} = useTranslation();
  const handleReadStatus = () => {
    // Handle read status
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StackHeader title={t('notification')} />
      <FlatList
        data={NOTIFICATION_LIST}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item}) => (
          <>
            <TouchableOpacity
              onPress={handleReadStatus}
              style={{
                ...styles.container,
                opacity: item.status === NOTIFICATION_STATUS.READ ? 0.3 : 1,
              }}>
              <FontAwesome5
                color={colors.green06}
                size={20}
                name="bell"
                solid
              />
              <View style={{gap: 4}}>
                <Text
                  style={{
                    ...typography.SemiBoldInterH5,
                    color: colors.green06,
                  }}>
                  [{item.title}]
                </Text>
                <Text
                  style={{
                    ...typography.RegularInterH4,
                    color: colors.green08,
                  }}>
                  Notification
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{height: 1, backgroundColor: colors.gray01}}></View>
          </>
        )}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});
