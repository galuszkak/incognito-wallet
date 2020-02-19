import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import srcArrowLeft from '@src/assets/images/icons/arrowLeft.png';
import PropTypes from 'prop-types';
import {headerStyled as styled} from './header.styled';

const Header = props => {
  const navigation = useNavigation();
  const {title, rightCol, isFirstRoute} = props;
  return (
    <View style={styled.container}>
      <View style={styled.leftCol}>
        {!isFirstRoute && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styled.arrowContainer}>
              <Image source={srcArrowLeft} style={{width: 32, height: 16}} />
            </View>
          </TouchableOpacity>
        )}
        {!!title && <Text style={styled.title}>{title}</Text>}
      </View>
      {!!rightCol && rightCol}
    </View>
  );
};

Header.defaultProps = {
  headerTitle: '',
  rightCol: null,
  isFirstRoute: false,
};

Header.propTypes = {
  headerTitle: PropTypes.string,
  rightCol: PropTypes.any,
  isFirstRoute: PropTypes.bool,
};

export default Header;
