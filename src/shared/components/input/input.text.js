import React from 'react';
import {View, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {commonStyled as styled} from './input.styled';

const Input = ({
  label = '',
  validated = {
    error: false,
    message: '',
  },
  ...rest
}) => {
  const [state, setState] = React.useState({
    isFocused: false,
  });
  const {isFocused} = state;
  const onFocus = () => {
    setState({...state, isFocused: true});
    if (typeof rest.onFocus === 'function') {
      rest.onFocus();
    }
  };

  const onBlur = () => {
    setState({...state, isFocused: false});
    if (typeof rest.onBlur === 'function') {
      rest.onBlur();
    }
  };
  return (
    <View style={styled.container}>
      <Text style={[styled.label, isFocused ? styled.labelFocused : null]}>
        {label}
      </Text>
      <TextInput
        {...rest}
        style={[styled.input, !rest.style ? rest.style : null]}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {!!validated.error && (
        <Text style={styled.error}>{validated.message}</Text>
      )}
    </View>
  );
};

Input.propTypes = {
  label: PropTypes.string,
};

export default Input;
