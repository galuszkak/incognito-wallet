import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import shieldSrc from '@src/assets/images/home/shield.png';
import sendSrc from '@src/assets/images/home/send.png';
import receiveSrc from '@src/assets/images/home/receive.png';
import {BtnActionToken,BtnLinear} from '@src/shared/components/button';
import Header from './detail.header';
import {styled, actionsStyled} from './detail.styled';
import withDetail from './detail.enhance';
import History from './details.history';


const Actions = () => {
  const actionFactories = [
    {
      title: 'Shield',
      desc: 'your crypto',
      src: shieldSrc,
    },
    {
      title: 'Send',
      desc: 'anonymously',
      src: sendSrc,
    },
    {
      title: 'Receive',
      desc: 'anonymously',
      src: receiveSrc,
    },
  ];
  return (
    <View style={actionsStyled.container}>
      {actionFactories.map((item, key) => (
        <BtnActionToken
          item={item}
          key={key}
          styledContainer={actionsStyled.styledContainer}
          hasDesc={false}
        />
      ))}
    </View>
  );
};

const Detail = props => {
  return (
    <View style={styled.container}>
      <Header {...props} />
      <Actions />
      <History />
      <BtnLinear title="Shield your crypto" style={styled.btnLinear} />
    </View>
  );
};

Detail.defaultProps = {
  displayName: 'Sample name',
  networkName: 'Name',
  amount: 0,
  symbol: null,
  isGettingBalance: false,
  style: null,
  pDecimals: null,
  tokenId: null,
  rightComponent: null,
  isVerified: false,
  iconUrl: null,
};

Detail.propTypes = {
  pDecimals: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  displayName: PropTypes.string,
  networkName: PropTypes.string,
  amount: PropTypes.number,
  symbol: PropTypes.string,
  isGettingBalance: PropTypes.bool,
  style: PropTypes.object,
  tokenId: PropTypes.string,
  rightComponent: PropTypes.node,
  isVerified: PropTypes.bool,
  iconUrl: PropTypes.string,
};

export default withDetail(Detail);
