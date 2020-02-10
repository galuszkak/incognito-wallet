import React from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from '@src/components/core';
import {useNavigation} from 'react-navigation-hooks';
import routeNames from '@src/router/routeNames';
//Assets
import bannerSrc from '@src/assets/images/home/banner.png';
import settingsSrc from '@src/assets/images/icons/settings.png';
import shieldSrc from '@src/assets/images/home/shield.png';
import sendSrc from '@src/assets/images/home/send.png';
import receiveSrc from '@src/assets/images/home/receive.png';
import tradeSrc from '@src/assets/images/home/trade.png';
import inventSrc from '@src/assets/images/home/invent.png';
import {styled, bannerStyled, navsStyled} from './home.styled';

const Banner = () => {
  const {navigate} = useNavigation();
  return (
    <View style={bannerStyled.banner}>
      <Image source={bannerSrc} style={bannerStyled.imgContainer} />
      <TouchableOpacity
        style={bannerStyled.settingsIcon}
        onPress={() => navigate(routeNames.Setting, {isPrivacy: true})}
      >
        <Image source={settingsSrc} />
      </TouchableOpacity>
      <View style={bannerStyled.introContainer}>
        <Text style={bannerStyled.title}>Go Incognito</Text>
        <Text style={bannerStyled.desc}>
          A privacy-first alternative for all your crypto activities.
        </Text>
      </View>
    </View>
  );
};

const Navs = () => {
  const navFactories = [
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
    {
      title: 'Trade',
      desc: 'anonymously',
      src: tradeSrc,
    },
    {
      title: 'Invent',
      desc: 'a new privacy coin',
      src: inventSrc,
    },
  ];
  return (
    <View style={navsStyled.container}>
      {navFactories.map((item, key) => (
        <View style={navsStyled.navItem} key={key}>
          <Image source={item.src} style={navsStyled.icon} />
          <Text style={navsStyled.title}>{item.title}</Text>
          <Text style={navsStyled.desc}>{item.desc}</Text>
        </View>
      ))}
    </View>
  );
};

const Home = () => {
  return (
    <View style={styled.container}>
      <Banner />
      <Navs />
    </View>
  );
};

Home.propTypes = {};

export default Home;
