import {StyleSheet} from 'react-native';
import {FONT} from '@src/styles';

export const styled = StyleSheet.create({
  container: {
    marginTop: -40,
  },
  hook: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(127, 127, 127, 0.5)',
    marginBottom: 20,
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 3,
    marginRight: 20,
  },
  edit: {
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: '#aaa',
  },
  hookTitle: {
    textTransform: 'uppercase',
    color: 'rgba(127, 127, 127, 0.5)',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
  },
  subTitle: {
    color: '#000',
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
  },
  rightCol: {
    justifyContent: 'flex-end',
  },
});
