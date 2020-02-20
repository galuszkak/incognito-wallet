import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import CryptoIcon from '@src/components/CryptoIcon';
import VerifiedText from '@src/components/VerifiedText';
import withTokenInfo from './tokenInfo.enhance';
import {styled, extraStyled, hookStyled} from './tokenInfo.styled';

const Hook = props => {
  const {label, value, isLastChild} = props;
  if (!value) {
    return null;
  }
  return (
    <View
      style={[hookStyled.container, isLastChild ? hookStyled.lastChild : null]}
    >
      <Text style={hookStyled.label}>{label}</Text>
      <Text style={hookStyled.value}>{value}</Text>
    </View>
  );
};

const Extra = props => {
  const {data} = props;
  return (
    <View style={extraStyled.container}>
      {data.map((item, key, arr) => (
        <Hook key={key} {...item} isLastChild={key === arr.length - 1} />
      ))}
    </View>
  );
};

const TokenInfo = props => {
  const {data, tokenInfo, selectedPrivacy} = props;
  const {
    tokenId,
    displayName,
    isVerified,
    symbol,
    networkName,
  } = selectedPrivacy;
  return (
    <View style={styled.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styled.introContainer}>
          <CryptoIcon size={70} tokenId={tokenId} />
          <View style={styled.verifiedText}>
            <VerifiedText
              text={`${symbol} ${networkName}`}
              numberOfLines={1}
              ellipsizeMode="middle"
              isVerified={isVerified}
              style={styled.networkName}
            />
          </View>
          <Text style={styled.displayName}>{displayName}</Text>
          {isVerified && <Text style={styled.verified}>Verified Coin</Text>}
        </View>
        <Extra data={data} />
      </ScrollView>
    </View>
  );
};

TokenInfo.propTypes = {
  data: PropTypes.array.isRequired,
  tokenInfo: PropTypes.any.isRequired,
};

export default withTokenInfo(TokenInfo);
