import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {accountSeleclor} from '@src/redux/selectors';
import dexUtils from '@src/utils/dex';
import Account from './features/account';
import withAccounts from './accounts.enhance';
import {isNodeAccount} from './accounts.utils';
import {devicesSelector} from './features/devices/devices.selector';

const styled = StyleSheet.create({
  container: {},
});
const Accounts = () => {
  const listAccount = useSelector(accountSeleclor.listAccount);
  const devices = useSelector(devicesSelector);
  return (
    <View style={styled.container}>
      {listAccount.map((item, key, arr) => (
        <Account
          key={item.name}
          isLastChild={arr.length - 1 === key}
          account={item}
          disabled={
            !(
              listAccount.length > 1 &&
              !dexUtils.isDEXAccount(item.name) &&
              !isNodeAccount(item.name, devices.data)
            )
          }
        />
      ))}
    </View>
  );
};

Accounts.propTypes = {};

export default withAccounts(Accounts);
