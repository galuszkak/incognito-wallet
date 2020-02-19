import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import srcNoTx from '@src/assets/images/icons/no_tx_yet.png';
import {FONT} from '@src/styles';
import { BtnLinear } from '@src/shared/components/button';

const styled = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  noTxDesc: {
    marginTop: 10,
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 4,
    textAlign: 'center',
  },
});

const EmptyHistory = () => {
  return (
    <View>
      <View style={styled.emptyContainer}>
        <View style={styled.noTx}>
          <Image source={srcNoTx} />
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
