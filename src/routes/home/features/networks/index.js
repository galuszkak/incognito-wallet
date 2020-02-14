import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FONT} from '@src/styles';
import PropTypes from 'prop-types';
import withNetworks from './networks.enhance';

const styled = StyleSheet.create({
  container: {
    padding: 20,
  },
  // title: {
  //   fontFamily: FONT.NAME.bold,
  //   color: '#000',
  //   fontSize: FONT.SIZE.regular - 2,
  //   lineHeight: FONT.SIZE.regular + 4,
  // },
  name: {
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: '#000',
  },
  address: {
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: '#aaa',
  },
});

const Networks = ({data}) => {
  const {name, address} = data;
  return (
    <View style={styled.container}>
      <Text style={styled.name}>{name}</Text>
      <Text style={styled.address}>{address}</Text>
    </View>
  );
};

Networks.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }),
};

export default withNetworks(Networks);
