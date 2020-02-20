import React from 'react';
import {View, StyleSheet} from 'react-native';
import withShield from './shield.enhance';

const styled = StyleSheet.create({
  container: {},
});

const Shield = props => {
  return <View style={styled.container} />;
};

Shield.propTypes = {};

export default withShield(Shield);
