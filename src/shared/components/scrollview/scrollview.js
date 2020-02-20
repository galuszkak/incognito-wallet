import React from 'react';
import {ScrollView} from 'react-native';

const ScrollViewCustom = props => {
  return <ScrollView showsVerticalScrollIndicator={false} {...props} />;
};

ScrollViewCustom.propTypes = {};

export default ScrollViewCustom;
