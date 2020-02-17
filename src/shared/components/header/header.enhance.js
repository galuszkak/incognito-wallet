import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Header from './header';
import {styled} from './header.styled';

const enhance = WrappedComp => props => {
  const {headerTitle, rightCol} = props;
  return (
    <View style={styled.container}>
      <Header title={headerTitle} rightCol={rightCol ? rightCol : null} />
      <View style={styled.wrappedComp}>
        <WrappedComp {...props} />
      </View>
    </View>
  );
};

enhance.PropTypes = {
  headerTitle: PropTypes.string.isRequired,
  rightCol: PropTypes.any,
};

export default enhance;
