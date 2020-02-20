import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import srcNoTx from '@src/assets/images/icons/no_tx_yet.png';
import {FONT} from '@src/styles';
import {BtnLinear} from '@src/shared/components/button';

const styled = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  noTxDesc: {
    marginTop: 10,
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 4,
    textAlign: 'center',
  },
  noTx: {},
  btnLinear: {
    width: '100%',
  },
  hook: {
    width: '100%',
    alignItems: 'center',
  },
});

const EmptyHistory = () => {
  return (
    <View style={styled.container}>
      <View style={styled.hook}>
        <View style={styled.noTx}>
          <Image source={srcNoTx} style={{height: 164, width: 144}} />
        </View>
        <Text style={styled.noTxDesc}>
          {'Shield a public coin to start \n transacting privately'}
        </Text>
      </View>
      <BtnLinear title="Shield your crypto" style={styled.btnLinear} />
    </View>
  );
};

EmptyHistory.propTypes = {};

export default EmptyHistory;
