import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {BtnClose} from '@src/shared/components/button';
import {FONT} from '@src/styles';

const styled = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  label: {
    color: '#fff',
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.large,
    lineHeight: FONT.SIZE.large + 6,
    textTransform: 'uppercase',
    paddingLeft: '10%',
  },
});

const Header = props => {
  return (
    <View style={styled.container}>
      <BtnClose whiteColor />
      <Text style={styled.label}>COIN INFO</Text>
    </View>
  );
};

Header.propTypes = {};

export default Header;
