import React from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import storageService from '@src/services/storage';
import {CONSTANT_KEYS} from '@src/constants';
import routeNames from '@src/router/routeNames';
import {useSelector} from 'react-redux';
import Switch from '@src/shared/components/switch';
import {useNavigation, useFocusEffect} from 'react-navigation-hooks';

const styled = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

const Security = () => {
  const pin = !!useSelector(state => state.pin.pin);
  const navigation = useNavigation();
  const [isBackedUpAccount, setBackupAccount] = React.useState(false);
  const showToast = () => {
    Alert.alert(
      'Backup your account first',
      'Please back up your accounts before using pass code',
      [
        {
          text: 'Later',
          style: 'cancel',
        },
        {
          text: 'Back up now',
          onPress: () => {
            navigation.navigate(routeNames.BackupKeys);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const togglePin = () => {
    if (pin) {
      navigation.navigate(routeNames.AddPin, {action: 'remove'});
    } else {
      navigation.navigate(routeNames.AddPin, {action: 'create'});
    }
  };

  const handleOnValueChange = () => {
    isBackedUpAccount ? togglePin() : showToast();
  };

  const getItem = () => {
    storageService
      .getItem(CONSTANT_KEYS.IS_BACKEDUP_ACCOUNT)
      .then(isBackedUp => {
        setBackupAccount(!!JSON.parse(isBackedUp));
      })
      .catch(() => {
        setBackupAccount(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getItem();
      return () => {
        getItem();
      };
    }, []),
  );

  return (
    <View style={styled.container}>
      <Text>Passcode</Text>
      <Switch onValueChange={handleOnValueChange} value={pin} />
    </View>
  );
};

Security.propTypes = {};

export default Security;
