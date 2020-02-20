import React from 'react';
import {View, Text, ScrollView, Clipboard} from 'react-native';
import PropTypes from 'prop-types';
import CryptoIcon from '@src/components/CryptoIcon';
import VerifiedText from '@src/components/VerifiedText';
import {BtnCopy} from '@src/shared/components/button';
import {Toast} from '@src/components/core';
import withTokenInfo from './tokenInfo.enhance';
import {styled, extraStyled, hookStyled} from './tokenInfo.styled';

const Hook = props => {
  const {label, value, isLastChild, copyable} = props;
  const handleCopy = () => {
    Clipboard.setString(value);
    Toast.showInfo(`${label} was copied!`);
  };
  // if (!value) {
  //   return null;
  // }
  return (
    <View
      style={[hookStyled.container, isLastChild ? hookStyled.lastChild : null]}
    >
      <Text style={hookStyled.label}>{label}</Text>
      <View style={hookStyled.valueContainer}>
        <Text style={hookStyled.value} ellipsizeMode="middle" numberOfLines={1}>
          {value}
        </Text>
        {copyable && <BtnCopy onPress={handleCopy} />}
      </View>
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
