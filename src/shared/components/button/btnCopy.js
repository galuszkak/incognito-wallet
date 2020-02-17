import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import srcCopy from '@src/assets/images/icons/copy.png';

const BtnCopy = props => {
  return (
    <TouchableOpacity {...props}>
      <Image source={srcCopy} />
    </TouchableOpacity>
  );
};

BtnCopy.propTypes = {};

export default BtnCopy;
