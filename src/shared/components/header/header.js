import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import srcArrowLeft from '@src/assets/images/icons/arrowLeft.png';
import {headerStyled as styled} from './header.styled';

const Header = ({title, rightCol, isFirstRoute = false}) => {
  const navigation = useNavigation();
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
        <Text style={styled.title}>{title}</Text>
      </View>
      {!!rightCol && rightCol}
    </View>
  );
};

Header.propTypes = {};

export default Header;
