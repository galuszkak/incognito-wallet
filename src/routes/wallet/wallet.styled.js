import {StyleSheet} from 'react-native';
import {FONT} from '@src/styles';

export const styled = StyleSheet.create({
  container: {},
});

export const headingStyled = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.large,
    lineHeight: FONT.SIZE.large + 8,
    color: '#fff',
    textTransform: 'uppercase',
  },
  accountName: {
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
  },
  btnChangeAcc: {
    color: '#85F8FD',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
  },
  rightCol: {
    // backgroundColor: `red`
  },
  leftCol: {
    // backgroundColor: `blue`
  },
});

export const tokensStyled = StyleSheet.create({
  container: {},
});
