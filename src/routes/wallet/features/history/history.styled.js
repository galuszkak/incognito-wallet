import {StyleSheet} from 'react-native';
import {FONT} from '@src/styles';

export const styled = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    flex: 1,
  },
});

export const itemStyled = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(127, 127, 127, 0.1)',
  },
  lastChild: {
    borderBottomColor: 'transparent',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  typeText: {
    color: '#aaa',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.small + 2,
    lineHeight: FONT.SIZE.small + 6,
  },
  time: {
    color: '#aaa',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.small,
    lineHeight: FONT.SIZE.small + 4,
  },
  amount: {
    color: '#000',
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 4,
  },
  statusText: {
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.small + 2,
    lineHeight: FONT.SIZE.small + 6,
  },
});
