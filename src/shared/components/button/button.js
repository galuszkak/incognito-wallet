import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {FONT} from '@src/styles';
import PropTypes from 'prop-types';

const styled = StyleSheet.create({
  title: {
    color: '#fff',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
});

const Button = ({title = '', btnStyle = {}, ...rest}) => {
  return (
    <TouchableOpacity {...rest}>
      <Text style={[styled.title, btnStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  btnStyle: PropTypes.any,
};

export default Button;
