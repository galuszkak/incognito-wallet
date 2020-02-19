import {View, Text, Image} from '@src/components/core';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import srcChecked from '@src/assets/images/icons/checked_green.png';
import styleSheet from './style';

class VerifiedText extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {text, isVerified, containerStyle, style, ...textProps} = this.props;

    return (
      <View style={[styleSheet.container, containerStyle]}>
        <Text {...textProps} style={[styleSheet.text, style]}>
          {text}
        </Text>
        {isVerified && (
          <Image source={srcChecked} style={styleSheet.verifiedFlagContainer} />
        )}
      </View>
    );
  }
}

VerifiedText.defaultProps = {
  text: null,
  isVerified: false,
  containerStyle: null,
  style: null,
};

VerifiedText.propTypes = {
  text: PropTypes.string,
  isVerified: PropTypes.bool,
  containerStyle: PropTypes.object,
  style: PropTypes.object,
};

export default VerifiedText;
