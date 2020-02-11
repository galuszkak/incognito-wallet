import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {tokenSeleclor} from '@src/redux/selectors';
import Token from '@src/routes/wallet/features/token';
import {CONSTANT_COMMONS} from '@src/constants';

const styled = StyleSheet.create({
  container: {},
});

const TokenList = props => {
  const tokens = useSelector(tokenSeleclor.followed);
  return (
    <View style={styled.container}>
      <Token tokenId={CONSTANT_COMMONS.PRV_TOKEN_ID} />
      {tokens.map(token => (
        <Token key={token.id} tokenId={token.id} />
      ))}
    </View>
  );
};

TokenList.propTypes = {};

export default TokenList;
