import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import srcCopy from '@src/assets/images/icons/copy.png';
import PropTypes from 'prop-types';

const BtnCopy = props => {
  const {btnStyle} = props;
  return (
    <TouchableOpacity {...props}>
      <Image source={srcCopy} style={[{width: 18, height: 20}, btnStyle]} />
    </TouchableOpacity>
  );
};

BtnCopy.defaultProps = {
  btnStyle: {},
};

BtnCopy.propTypes = {
  btnStyle: PropTypes.any,
};

export default BtnCopy;
