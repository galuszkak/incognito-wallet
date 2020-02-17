import {StyleSheet} from 'react-native';
import {FONT} from '@src/styles';
import {MAIN_COLOR} from '@src/shared/stylesheet';

export const commonStyled = StyleSheet.create({
  container: {},
  label: {
    textTransform: 'uppercase',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: '#aaa',
  },
  input: {
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: '#000',
    padding: 0
  },
  labelFocused: {
    color: MAIN_COLOR,
  },
  error: {
    color: '#f40000',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.small - 1,
    lineHeight: FONT.SIZE.small + 6,
  },
});
