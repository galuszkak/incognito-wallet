import {StyleSheet} from 'react-native';
import {FONT} from '@src/styles';

export const styled = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: `rgba(0,0,0,0.1)`
  },
  logoContainer: {},
  cryptoNameContainer: {
    marginLeft: '5%',
    marginRight: 'auto',
  },
  displayName: {
    color: '#000',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 4,
  },
  networkName: {
    color: '#aaa',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 4,
  },
  amountContainer: {},
  amountText: {
    color: '#000',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 4,
  },
});
