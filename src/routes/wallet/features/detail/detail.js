import React from 'react';
import {View} from 'react-native';
import shieldSrc from '@src/assets/images/icons/shield.png';
import sendSrc from '@src/assets/images/icons/send.png';
import receiveSrc from '@src/assets/images/icons/receive.png';
import {BtnActionToken} from '@src/shared/components/button';
import History from '@src/routes/history';
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
          item={item}
          key={item.id}
          styledContainer={actionsStyled.styledContainer}
          hasDesc={false}
        />
      ))}
    </View>
  );
};

const Detail = () => {
  return (
    <View style={styled.container}>
      <Actions />
      <History />
    </View>
  );
};

export default withDetail(Detail);
