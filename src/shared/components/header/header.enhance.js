import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Header from './header';
import {styled} from './header.styled';

const enhance = WrappedComp => props => {
  const {headerTitle, rightCol, isFirstRoute, ...rest} = props;
  return (
    <View style={styled.container}>
      <Header
        title={headerTitle}
        rightCol={rightCol}
        isFirstRoute={isFirstRoute}
      />
      <View style={styled.wrappedComp}>
        <WrappedComp {...rest} />
      </View>
    </View>
  );
};

enhance.defaultProps = {
  headerTitle: '',
  rightCol: null,
  isFirstRoute: false,
};

enhance.PropTypes = {
  headerTitle: PropTypes.string,
  rightCol: PropTypes.any,
  isFirstRoute: PropTypes.bool,
};

export default enhance;
