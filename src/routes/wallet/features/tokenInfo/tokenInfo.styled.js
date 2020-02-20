import {StyleSheet} from 'react-native';
import {FONT} from '@src/styles';

export const styled = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: -30,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 40,
    flex: 1,
  },
  displayName: {
    color: '#aaa',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    textTransform: 'uppercase',
    marginTop: 10,
    marginBottom: 20,
  },
  verified: {
    color: '#29E6BB',
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
  },
  networkName: {
    color: '#000',
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.small,
    lineHeight: FONT.SIZE.small + 6,
  },
  verifiedText: {
    marginTop: 10,
  },
  introContainer: {
    alignItems: 'center',
  },
});

export const extraStyled = StyleSheet.create({
  container: {},
});

export const hookStyled = StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(127,127,127,0.2)',
  },
  isLastChild: {
    borderBottomColor: 'transparent',
  },
  label: {
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: '#aaa',
  },
  value: {
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: '#000',
    marginTop: 10,
  },
});
