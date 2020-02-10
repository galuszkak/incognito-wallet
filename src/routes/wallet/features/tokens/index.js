import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {styled} from './tokens.styled';
import withTokens from './tokens.enhance';

const Tokens = () => {
  return <View style={styled.container}>{}</View>;
};

Tokens.propTypes = {};

export default withTokens(Tokens);
