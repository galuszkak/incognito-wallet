import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import srcChecked from '@src/assets/images/icons/checked_green.png';
import {FONT} from '@src/styles';

const styled = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
  },
});

const VerifiedToken = props => {
  const {isVerified, token} = props;
  return (
    <View style={styled.container}>
      <Text style={styled.networkName} numberOfLines={1} ellipsizeMode="middle">
        {token}
      </Text>
      {isVerified && (
        <Image source={srcChecked} style={{width: 16, height: 16}} />
      )}
    </View>
  );
};

VerifiedToken.defaultProps = {
  isVerified: false,
  token: '',
};

VerifiedToken.propTypes = {
  isVerified: PropTypes.bool,
  token: PropTypes.string,
};

export default VerifiedToken;
