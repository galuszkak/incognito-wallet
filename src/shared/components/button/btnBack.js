import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import srcArrLeft from '@src/assets/images/icons/arrowLeft.png';

const BtnBack = props => {
  return (
    <TouchableOpacity {...props}>
      <Image source={srcArrLeft} />
    </TouchableOpacity>
  );
};

BtnBack.propTypes = {};

export default BtnBack;
