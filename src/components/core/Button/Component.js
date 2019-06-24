import { ActivityIndicator, Text, View } from '@src/components/core';
import { COLORS } from '@src/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity as RNComponent } from 'react-native';
import styleSheet from './style';

const Button = ({ title, children, style, titleStyle, type, onPress, loadingColor, isLoading: isLoadingProps, prepend, isAsync, ...props }) => {
  const [ isLoading, setLoading ] = useState(false);
  useEffect(() => {
    setLoading(isLoadingProps);
  }, [isLoadingProps]);

  const handlePress = () => {
    if (typeof onPress === 'function') {
      const pressed = onPress();
      if (pressed instanceof Promise) {
        setLoading(true);
        pressed.finally(() => setLoading(false));
      }
    }
  };

  const renderChild = child => {
    if (typeof child === 'function') {
      return children(isLoading);
    }
    return child;
  };

  return (
    <RNComponent {...props} onPress={handlePress} style={[styleSheet.button, type && styleSheet[`${type}Style`], style]} activeOpacity={0.9}>
      {
        children ? renderChild(children) : (
          <>
            { prepend }
            <View style={styleSheet.textContainer}>
              <Text style={[styleSheet.text, titleStyle]} numberOfLines={1} ellipsizeMode='tail'>{title}</Text>
            </View>
            { isAsync && isLoading && <ActivityIndicator style={[styleSheet.loadingIcon]} color={loadingColor} size='small' /> }
          </>
        )
      }
    </RNComponent>
  );
};

Button.defaultProps = {
  loadingColor: COLORS.white,
  isLoading: false,
  isAsync: false,
  prepend: null,
  onPress: null,
  style: null,
  titleStyle: null,
  title: null,
  children: null,
  type: null
};

Button.propTypes = {
  isAsync: PropTypes.bool,
  prepend: PropTypes.node,
  isLoading: PropTypes.bool,
  loadingColor: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  type: PropTypes.oneOf(['primary', 'danger'])
};

export default Button;
