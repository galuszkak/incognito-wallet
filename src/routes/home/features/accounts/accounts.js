import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {accountSeleclor} from '@src/redux/selectors';
import Account from './accounts.item';

const styled = StyleSheet.create({
  container: {},
});
const Accounts = props => {
  const listAccount = useSelector(accountSeleclor.listAccount);

  return (
    <View style={styled.container}>
      {listAccount.map((item, key, arr) => (
        <Account
          key={item.name}
          isLastChild={arr.length - 1 === key}
          {...item}
        />
      ))}
    </View>
  );
};

Accounts.propTypes = {
  listAccount: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Accounts;
