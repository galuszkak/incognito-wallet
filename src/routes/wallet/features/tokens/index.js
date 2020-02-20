import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {ScrollView, RefreshControl} from '@src/components/core';
import PropTypes from 'prop-types';
import srcBtnLinear from '@src/assets/images/icons/linearBtn.png';
import {useNavigation} from 'react-navigation-hooks';
import routeNames from '@src/router/routeNames';
import srcArrowRight from '@src/assets/images/icons/arrowRight.png';
import {styled, styledBtn, styledExtra} from './tokens.styled';
import withTokens from './tokens.enhance';
import TokenList from './tokens.list';

const Extra = () => {
  const navigation = useNavigation();
  const handleOnPress = () => {
    navigation.navigate(routeNames.FollowToken, {isPrivacy: true});
  };
  return (
    <View style={styledExtra.container}>
      <Text style={styledExtra.title}>Looking for a privacy coin?</Text>
      <TouchableWithoutFeedback onPress={handleOnPress}>
        <View style={styledExtra.hook}>
          <Text style={styledExtra.nav}>Add coin to your list</Text>
          <View style={styledExtra.arrow}>
            <Image source={srcArrowRight} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const BtnCreateToken = () => {
  const {navigate} = useNavigation();
  const handleOnPress = () => {
    navigate(routeNames.CreateToken, {isPrivacy: true});
  };
  return (
    <TouchableOpacity style={styledBtn.container} onPress={handleOnPress}>
      <Text style={styledBtn.title}>Issue a privacy coin</Text>
      <Image source={srcBtnLinear} style={styledBtn.bg} />
    </TouchableOpacity>
  );
};

const Tokens = props => {
  const {isReloading, reload} = props;
  return (
    <ScrollView
      style={styled.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isReloading} onRefresh={reload} />
      }
    >
      <TokenList />
      <BtnCreateToken />
      <Extra />
    </ScrollView>
  );
};

Tokens.propTypes = {
  isReloading: PropTypes.bool.isRequired,
  reload: PropTypes.func.isRequired,
};

export default withTokens(Tokens);
