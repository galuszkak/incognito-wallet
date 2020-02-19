import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import {FONT} from '@src/styles';
import srcBtnLinear from '@src/assets/images/icons/linearBtn.png';

const styled = StyleSheet.create({
  title: {
    color: '#000',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular + 2,
    position: 'absolute',
    zIndex: 1,
  },
  container: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

const BtnLinear = props => {
  const {title, disabled = false, ...rest} = props;
  return (
    <TouchableOpacity {...{...rest, disabled}}>
      <ImageBackground
        source={srcBtnLinear}
        style={[
          styled.container,
          disabled ? {opacity: 0.5} : null,
          rest.style ? rest.style : null,
        ]}
      >
        <Text style={styled.title}>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

BtnLinear.defaultProps = {
  title: 'Button',
};

BtnLinear.propTypes = {
  title: PropTypes.string,
};

export default BtnLinear;
