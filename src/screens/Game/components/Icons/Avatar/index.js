import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import bear from './Bear.png';
import bull from './Bull.png';
import cat from './Cat.png';
import dog from './Dog.png';
import unicorn from './Unicorn.png';
import whale from './Whale.png';

const images = {
  bear,
  bull,
  cat,
  dog,
  unicorn,
  whale,
};

const Avatar = ({ type }) =>
  (
    <Image
      resizeMode='contain'
      source={images[type]}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );

Avatar.propTypes = {
  type: PropTypes.oneOf([
    'bear',
    'bull',
    'cat',
    'dog',
    'unicorn',
    'whale',
  ])
};

Avatar.defaultProps = {
  type: 'unicorn',
};

export default Avatar;
