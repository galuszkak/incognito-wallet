import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import srcScan from '@src/assets/images/icons/scan.png';

const styled = StyleSheet.create({
  scan: {
    width: 32,
    height: 32,
  },
});

const BtnScan = ({btnStyle = null, ...rest}) => {
  return (
    <TouchableOpacity {...rest}>
      <Image style={[styled.scan, btnStyle]} source={srcScan} />
    </TouchableOpacity>
  );
};

BtnScan.propTypes = {};

export default BtnScan;
