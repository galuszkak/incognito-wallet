import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {FONT} from '@src/styles';
import {useSelector, useDispatch} from 'react-redux';
import {accountSeleclor} from '@src/redux/selectors';
import srcKey from '@src/assets/images/icons/account_key_.png';
import srcKeyActived from '@src/assets/images/icons/account_key_actived.png';
import {removeAccount, switchAccount} from '@src/redux/actions/account';
import {Toast} from '@src/components/core';
import { ExHandler } from '@src/services/exception';

const styled = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(127,127,127, 0.1)',
  },
  lastChild: {
    borderBottomColor: 'transparent',
  },
  name: {
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: '#aaa',
  },
  actived: {
    fontFamily: FONT.NAME.bold,
    color: '#000',
  },
});

const Account = ({name, isLastChild}) => {
  const dispatch = useDispatch();
  const defaultAccount = useSelector(accountSeleclor.defaultAccount) || {
    name: '',
  };
  const isActived = name === defaultAccount.name;
  const handleSwitchAccount = async () => {
    try {
      if (defaultAccount.name === name) {
        return Toast.showInfo(`Your current account is "${name}"`);
      }
      await dispatch(switchAccount(name));
      Toast.showInfo(`Switched to account "${name}"`);
    } catch (e) {
      new ExHandler(
        e,
        `Can not switch to account "${name}", please try again.`,
      ).showErrorToast();
    }
  };
  return (
    <TouchableOpacity onPress={handleSwitchAccount}>
      <View style={[styled.container, isLastChild ? styled.lastChild : {}]}>
        <Text style={[styled.name, isActived ? styled.actived : {}]}>
          {name}
        </Text>
        <Image source={isActived ? srcKeyActived : srcKey} />
      </View>
    </TouchableOpacity>
  );
};

Account.defaultProps = {
  name: '',
};

Account.propTypes = {
  name: PropTypes.string,
  isLastChild: PropTypes.bool.isRequired,
};

export default Account;
