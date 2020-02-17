import React from 'react';
import {Switch} from 'react-native';

const SwitchComponent = ({value, ...rest}) => {
  return (
    <Switch
      thumbColor={value ? '#85F8FD' : '#747575'}
      trackColor={{
        false: '#D9DBDB',
        true: '#747575',
      }}
      {...rest}
    />
  );
};

SwitchComponent.propTypes = {};

export default SwitchComponent;
