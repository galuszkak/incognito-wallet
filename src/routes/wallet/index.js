import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {styled, headingStyled} from './wallet.styled';
import Tokens from './features/tokens';

const Heading = () => {
  const account = useSelector(state => state.account);
  return (
    <View style={headingStyled.container}>
      <View style={headingStyled.leftCol}>
        <Text style={headingStyled.title}>WALLET</Text>
        <Text style={headingStyled.accountName}>
          {account.defaultAccountName}
        </Text>
      </View>
      <View style={headingStyled.rightCol}>
        <TouchableOpacity>
          <Text style={headingStyled.btnChangeAcc}>Change account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Wallet = () => {
  return (
    <View style={styled.container}>
      <Heading />
      <Tokens />
    </View>
  );
};

Wallet.propTypes = {};

export default Wallet;
