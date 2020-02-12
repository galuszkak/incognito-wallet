import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import srcNoTx from '@src/assets/images/icons/no_tx_yet.png';
import {FONT} from '@src/styles';

const styled = StyleSheet.create({
  // container: {
  //   backgroundColor: 'red',
  // },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  // noTx: {},
  noTxDesc: {
    marginTop: 10,
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 4,
    textAlign: 'center',
  },
});

const EmptyHistory = props => {
  return (
    <View style={styled.emptyContainer}>
      <View style={styled.noTx}>
        <Image source={srcNoTx} />
      </View>
      <Text style={styled.noTxDesc}>
        {'Shield a public coin to start \n transacting privately'}
      </Text>
    </View>
  );
};

const History = props => {
  return <EmptyHistory />;
  // return <View style={styled.container} />;
};

History.propTypes = {};

export default History;
