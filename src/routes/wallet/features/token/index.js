import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import CryptoIcon from '@src/components/CryptoIcon';
import VerifiedText from '@src/components/VerifiedText';
import formatUtil from '@src/utils/format';
import {ActivityIndicator} from '@src/components/core';
import {styled} from './token.styled';
import withToken from './token.enhance';

const AmountToken = ({isGettingBalance, amount, pDecimals, symbol}) => {
  if (isGettingBalance) {
    return <ActivityIndicator size="small" />;
  }
  if (amount === null) {
    return <Text>---</Text>;
  }
  return (
    <Text style={styled.amountText} numberOfLines={1} ellipsizeMode="tail">
      {formatUtil.amount(amount, pDecimals)} {symbol}
    </Text>
  );
};

const Token = props => {
  const {tokenId, iconUrl, displayName, networkName, isVerified} = props;
  return (
    <View style={styled.container}>
      <View style={styled.logoContainer}>
        <CryptoIcon uri={iconUrl} tokenId={tokenId} />
      </View>
      <View style={styled.cryptoNameContainer}>
        <VerifiedText
          text={displayName}
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styled.displayName}
          isVerified={isVerified}
        />
        <Text style={styled.networkName} numberOfLines={1} ellipsizeMode="tail">
          {networkName}
        </Text>
      </View>
      <View style={styled.amountContainer}>
        <AmountToken {...props} />
      </View>
    </View>
  );
};

Token.defaultProps = {
  displayName: 'Sample name',
  networkName: 'Name',
  amount: 0,
  symbol: null,
  isGettingBalance: false,
  style: null,
  pDecimals: null,
  tokenId: null,
  rightComponent: null,
  isVerified: false,
  iconUrl: null,
};

Token.propTypes = {
  pDecimals: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  displayName: PropTypes.string,
  networkName: PropTypes.string,
  amount: PropTypes.number,
  symbol: PropTypes.string,
  isGettingBalance: PropTypes.bool,
  style: PropTypes.object,
  tokenId: PropTypes.string,
  rightComponent: PropTypes.node,
  isVerified: PropTypes.bool,
  iconUrl: PropTypes.string,
};

export default withToken(Token);
