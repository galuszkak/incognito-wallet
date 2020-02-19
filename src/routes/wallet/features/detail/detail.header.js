import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {FONT} from '@src/styles';
import srcInfo from '@src/assets/images/icons/info.png';
import srcMore from '@src/assets/images/icons/more.png';
import VerifiedText from '@src/components/VerifiedText';
import formatUtil from '@src/utils/format';

const styled = StyleSheet.create({
  container: {
    borderColor: '#fff',
    flex: 1,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  displayName: {
    color: '#fff',
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.large,
    lineHeight: FONT.SIZE.large + 8,
    textTransform: 'uppercase',
  },
  networkName: {
    color: '#aaa',
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 8,
    textTransform: 'uppercase',
  },
  hookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '50%',
  },
  infoContainer: {
    marginHorizontal: 20,
  },
  actionContainer: {},
  amountContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 20,
  },
  amountText: {
    color: '#fff',
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.large + 4,
    lineHeight: FONT.SIZE.large + 10,
  },
  symbol: {
    color: '#fff',
    marginTop: -10,
    marginLeft: 5,
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
  },
});

const AmountToken = ({isGettingBalance, amount, pDecimals, symbol}) => {
  if (isGettingBalance) {
    return <ActivityIndicator size="small" />;
  }
  if (amount === null) {
    return <Text>-</Text>;
  }
  return (
    <View style={styled.amountContainer}>
      <Text style={styled.amountText} numberOfLines={1} ellipsizeMode="tail">
        {formatUtil.amount(amount, pDecimals)}
      </Text>
      <Text style={styled.symbol}>{symbol}</Text>
    </View>
  );
};

const Header = props => {
  const {displayName, isVerified, networkName} = props;
  return (
    <View style={styled.container}>
      <View style={styled.headingContainer}>
        <View style={styled.introContainer}>
          <VerifiedText
            text={displayName}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styled.displayName}
            isVerified={isVerified}
          />
          <Text
            style={styled.networkName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {networkName}
          </Text>
        </View>
        <View style={styled.hookContainer}>
          <TouchableWithoutFeedback>
            <View style={styled.infoContainer}>
              <Image source={srcInfo} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styled.actionContainer}>
              <Image source={srcMore} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <AmountToken {...props} />
    </View>
  );
};

Header.propTypes = {};

export default Header;
