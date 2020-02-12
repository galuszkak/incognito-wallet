import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import {FONT} from '@src/styles';

const styled = StyleSheet.create({
  container: {
    width: `${100 / 3}%`,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItem: {
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: FONT.NAME.regular,
    color: '#000',
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 10,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 2,
  },
  desc: {
    fontFamily: FONT.NAME.regular,
    color: 'rgba(0,0,0,0.8)',
    fontSize: FONT.SIZE.small,
    lineHeight: FONT.SIZE.small + 6,
    textAlign: 'center',
  },
});

const BtnActionToken = props => {
  const {item, styledContainer, styledNavItem, hasDesc, ...rest} = props;
  return (
    <TouchableOpacity
      {...rest}
      style={{
        ...styled.container,
        ...styledContainer,
      }}
    >
      <View style={{...styled.navItem, ...styledNavItem}}>
        <Image source={item.src} style={styled.icon} />
        <Text style={styled.title}>{item.title}</Text>
        {hasDesc && <Text style={styled.desc}>{item.desc}</Text>}
      </View>
    </TouchableOpacity>
  );
};

BtnActionToken.defaultProps = {
  item: {
    title: 'Title',
    desc: 'Desc',
    src: '',
  },
  styledContainer: {},
  styledNavItem: {},
  hasDesc: true,
};

BtnActionToken.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }),
  styledContainer: PropTypes.any,
  styledNavItem: PropTypes.any,
  hasDesc: PropTypes.bool,
};

export default BtnActionToken;
