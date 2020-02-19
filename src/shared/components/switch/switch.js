import React from 'react';
import {Switch} from 'react-native';
import PropTypes from 'prop-types';

const SwitchComponent = ({value, ...rest}) => {
  return (
    <Switch
      thumbColor={value ? '#85F8FD' : '#747575'}
      trackColor={{
        false: '#D9DBDB',
        true: '#747575',
      }}
      {...{...rest, value}}
    />
  );
};

SwitchComponent.defaultProps = {
  value: false,
};

SwitchComponent.propTypes = {
  value: PropTypes.bool,
};

export default SwitchComponent;
