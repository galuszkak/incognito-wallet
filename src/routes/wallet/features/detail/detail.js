import React from 'react';
import {View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import shieldSrc from '@src/assets/images/home/shield.png';
import sendSrc from '@src/assets/images/home/send.png';
import receiveSrc from '@src/assets/images/home/receive.png';
import {BtnActionToken} from '@src/shared/components/button';
import History from '@src/routes/wallet/features/history';
import {styled, actionsStyled} from './detail.styled';
import withDetail from './detail.enhance';

const Actions = () => {
  const actionFactories = [
    {
      title: 'Shield',
      desc: 'your crypto',
      src: shieldSrc,
      id: 1,
    },
    {
      title: 'Send',
      desc: 'anonymously',
      src: sendSrc,
      id: 2,
    },
    {
      title: 'Receive',
      desc: 'anonymously',
      src: receiveSrc,
      id: 3,
    },
  ];
  return (
    <View style={actionsStyled.container}>
      {actionFactories.map((item, key) => (
        <BtnActionToken
          item={item.id}
          key={key}
          styledContainer={actionsStyled.styledContainer}
          hasDesc={false}
        />
      ))}
    </View>
  );
};

const Detail = () => {
  return (
    <ScrollView style={styled.container}>
      <Actions />
      <History />
    </ScrollView>
  );
};

Detail.defaultProps = {};

Detail.propTypes = {};

export default withDetail(Detail);
