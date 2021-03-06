import React from 'react';
import { Text as RNComponent } from 'react-native';
import styleSheet from './style';

const Text = ({ style, ...props }) => <RNComponent allowFontScaling={false} {...props} style={[styleSheet.root, style]} />;

export default Text;