import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import srcClose from '@src/assets/images/icons/close.png';

const BtnClose = props => {
  return (
    <TouchableOpacity {...props}>
      <Image source={srcClose} style={{width: 20, height: 20}} />
    </TouchableOpacity>
  );
};

BtnClose.propTypes = {};

export default BtnClose;
