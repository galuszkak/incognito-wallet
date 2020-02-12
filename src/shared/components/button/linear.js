import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {FONT} from '@src/styles';
import srcBtnLinear from '@src/assets/images/icons/linearBtn.png';

const styled = StyleSheet.create({
  bg: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 50,
  },
  title: {
    color: '#000',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular + 2,
    position: 'absolute',
    zIndex: 1,
  },
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    height: 60,
  },
});

const BtnLinear = props => {
  const {title, ...rest} = props;
  return (
    <TouchableOpacity {...rest}>
      <View style={styled.container}>
        <Text style={styled.title}>{title}</Text>
        <Image source={srcBtnLinear} style={styled.bg} />
      </View>
    </TouchableOpacity>
  );
};

BtnLinear.defaultProps = {
  title: 'Button',
};

BtnLinear.propTypes = {
  title: PropTypes.string,
};

export default BtnLinear;
