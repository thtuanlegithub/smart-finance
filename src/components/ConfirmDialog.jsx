import React from 'react';
import {Modal, View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import typography from '../styles/typography';
import colors from '../styles/colors';
import {useTranslation} from 'react-i18next';

const ConfirmDialog = ({visible, title, message, onConfirm, onCancel}) => {
  const {t} = useTranslation();
  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.controlContainer}>
            <TouchableHighlight
              underlayColor="#FFECEC"
              style={[
                styles.controlCancel,
                {
                  borderRightWidth: 0.4,
                  borderColor: colors.gray03,
                },
              ]}
              onPress={onCancel}>
              <Text style={styles.controlCancelText}>{t('cancel')}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#E6FFF2"
              style={styles.controlConfirm}
              onPress={onConfirm}>
              <Text style={styles.controlConfirmText}>{t('confirm')}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    paddingTop: 16,
    borderRadius: 16,
    width: 270,
  },
  title: {
    paddingHorizontal: 24,
    flexWrap: 'wrap',
    ...typography.SemiBoldInterH3,
    textAlign: 'center',
    color: colors.green07,
  },
  message: {
    ...typography.RegularInterH4,
    textAlign: 'center',
    color: colors.green08,
    paddingBottom: 16,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  controlContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 0.4,
    borderColor: colors.gray03,
  },
  controlCancelText: {
    ...typography.RegularInterH4,
    color: 'red',
    padding: 10,
  },
  controlConfirmText: {
    ...typography.MediumInterH4,
    color: 'green',
    padding: 10,
    flexWrap: 'wrap',
  },
  controlCancel: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomStartRadius: 16,
  },
  controlConfirm: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 16,
  },
});

export default ConfirmDialog;
