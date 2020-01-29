import { Image, View } from '@src/components/core';
import defaultTokenIcon from '@src/assets/images/icons/default_token_icon.png';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { selectedPrivacySeleclor } from '@src/redux/selectors';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import styleSheet from './style';

const getVerifiedFlagStyle = (size) => {
  const verifiedFlagSize = Math.round(size * 0.5);
  const verifiedFlagStyle = {
    borderRadius: Math.round(verifiedFlagSize * 0.5),
    bottom: -Math.round(verifiedFlagSize * 0.25),
    right: -Math.round(verifiedFlagSize * 0.25),
    width: verifiedFlagSize + 1,
    height: verifiedFlagSize + 1
  };

  return [verifiedFlagSize, verifiedFlagStyle];
};

class CryptoIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: null,
      imageComponent: null,
      verifiedFlagStyle: null,
      verifiedFlagSize: null
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const { size } = nextProps;

    const [verifiedFlagSize, verifiedFlagStyle] = getVerifiedFlagStyle(size);

    return {
      verifiedFlagStyle,
      verifiedFlagSize
    };
  }

  componentDidMount() {
    const { tokenId, onlyDefault } = this.props;

    tokenId && !onlyDefault && this.getUri();
  }

  componentDidUpdate(prevProps) {
    const { tokenId, onlyDefault } = this.props;
    const { tokenId: oldTokenId, onlyDefault: oldOnlyDefault } = prevProps;

    if (tokenId !== oldTokenId || onlyDefault !== oldOnlyDefault) {
      this.getUri();
    }
  }

  getSize = () => {
    const { size } = this.props;

    return { width: Number(size), height: Number(size) };
  }

  getUri = async () => {
    const { token, logoStyle } = this.props;
    const uri = token?.iconUrl;

    this.setState({ uri, imageComponent: (
      <Image
        style={[styleSheet.logo, logoStyle, this.getSize()]}
        source={{ uri: `${uri}?t=${new Date().getDate()}.${new Date().getHours()}` }}
        onError={this.onLoadError}
        onLoadStart={this.onLoadStart}
        onLoadEnd={this.onLoadEnd}
      />
    ) });
  };

  onLoadError = () => {
    this.setState({ uri: '' });
  };

  renderDefault = (logoStyle) => (
    <Image
      style={[styleSheet.logo, logoStyle, this.getSize()]}
      source={defaultTokenIcon}
    />
  );

  render() {
    const { uri, imageComponent, verifiedFlagStyle, verifiedFlagSize } = this.state;
    const { onlyDefault, containerStyle, logoStyle, size, token, showVerifyFlag } = this.props;
    const { isVerified } = token || {};

    return (
      <View>
        <View style={[styleSheet.container, containerStyle, { borderRadius: size }, this.getSize()]}>
          {
            onlyDefault || !uri
              ? this.renderDefault(logoStyle)
              : imageComponent
          }
        </View>
        { showVerifyFlag && isVerified && (
          <View style={[styleSheet.verifiedFlagContainer, verifiedFlagStyle]}>
            <Icons style={[styleSheet.verifiedFlag]} name='check-circle' size={verifiedFlagSize} />
          </View>
        ) }
      </View>
    );
  }
}

CryptoIcon.defaultProps = {
  onlyDefault: false,
  tokenId: null,
  containerStyle: null,
  logoStyle: null,
  size: 40,
  token: null,
  showVerifyFlag: false
};

CryptoIcon.propTypes = {
  tokenId: PropTypes.string,
  onlyDefault: PropTypes.bool,
  containerStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  token: PropTypes.object,
  size: PropTypes.number,
  showVerifyFlag: PropTypes.bool,
};


const mapState = (state, props) => ({
  token: props?.tokenId && selectedPrivacySeleclor.getPrivacyDataByTokenID(state)(props?.tokenId)
});

export default connect(mapState)(CryptoIcon);
