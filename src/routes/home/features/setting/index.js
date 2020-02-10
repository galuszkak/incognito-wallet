import React from 'react';
import {View, Text} from 'react-native';
import {accountSeleclor} from '@src/redux/selectors';
import {useSelector} from 'react-redux';
import {Styled} from './setting.styled';
// import withSetting from './setting.enhance';

const Setting = props => {
  const account = useSelector(state => state?.account || {});
  console.log('account', account);
  return (
    <View style={Styled.container}>
      <Text>This is page settings</Text>
    </View>
  );
};

Setting.propTypes = {};

export default Setting;
