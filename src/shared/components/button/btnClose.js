import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import srcClose from '@src/assets/images/icons/close.png';
import srcCloseWhite from '@src/assets/images/icons/close_white.png';
import PropTypes from 'prop-types';

const BtnClose = props => {
  const {whiteColor} = props;
  return (
    <TouchableOpacity {...props}>
      <Image
        source={whiteColor ? srcCloseWhite : srcClose}
        style={{width: 20, height: 20}}
      />
    </TouchableOpacity>
  );
};

BtnClose.defaultProps = {
  whiteColor: false,
};

BtnClose.propTypes = {
  whiteColor: PropTypes.bool,
};

export default BtnClose;
