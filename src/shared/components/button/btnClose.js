import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import srcClose from '@src/assets/images/icons/close.png';

const BtnClose = props => {
  return (
    <TouchableOpacity {...props}>
      <Image source={srcClose} />
    </TouchableOpacity>
  );
};

BtnClose.propTypes = {};

export default BtnClose;
