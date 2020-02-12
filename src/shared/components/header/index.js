import React from 'react';
import {View, StyleSheet} from 'react-native';

const styled = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
});

const Header = props => {
  return <View style={styled.container} />;
};

Header.propTypes = {};

export default Header;
