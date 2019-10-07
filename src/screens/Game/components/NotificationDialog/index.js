import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import moment from 'moment';
import {Image, ScrollView} from '@src/components/core';
import {screenHeight, screenWidth} from '../../constants';
import {NotificationType} from '../../../../models/game';
import income from './income.png';
import outcome from './outcome.png';

function NotificationDialog(props) {
  const { visible, onCancel, notifications } = props;

  return (
    <Dialog visible={visible} style={styles.dialog}>
      <View>
        <DialogContent style={styles.content}>
          <ScrollView style={styles.scrollView}>
            {notifications
              .map((notification) => (
                <View style={styles.notification} key={notification.id}>
                  <View>
                    <Image
                      source={notification.type === NotificationType.INCOME ? income : outcome}
                      style={styles.image}
                      resizeMode='contain'
                    />
                  </View>
                  <View style={{ paddingRight: 10 }}>
                    <Text style={styles.text}>{notification.message}</Text>
                    <Text style={styles.text}>{moment(notification.createdAt, 'YYYY-MM-DDTHH:mm:ssZ').fromNow()}</Text>
                  </View>
                </View>
              ))}
          </ScrollView>
        </DialogContent>
        <View style={[styles.center, styles.actions]}>
          <TouchableOpacity onPress={onCancel} style={[styles.center, styles.closeButton]}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  content: {
    width: screenWidth,
    height: screenHeight - 80,
  },
  scrollView: {
    marginTop: 20,
  },
  closeButton: {
    width: 120,
    height: 32,
    backgroundColor: '#014E52',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    height: 50,
    padding: 30,
  },
  buttonText: {
    color: 'white'
  },
  text: {
    fontSize: 13,
  },
  notification: {
    padding: 10,
    borderColor: '#9AB7B8',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 36,
    height: 36,
    marginRight: 10,
  }
});

NotificationDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onConfirmPrice: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  cells: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number,
    token: PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.number,
      symbol: PropTypes.string,
    })
  })).isRequired,
  playerTokens: PropTypes.arrayOf(PropTypes.shape({

  })).isRequired,
};

export default React.memo(NotificationDialog);
