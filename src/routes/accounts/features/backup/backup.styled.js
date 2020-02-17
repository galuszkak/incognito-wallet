import {StyleSheet} from 'react-native';
import {FONT} from '@src/styles';

export const styled = StyleSheet.create({
  container: {
    marginTop: -40,
  },
  item: {
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderWidth: 0.1,
  },
  hook: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: '#000',
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
  },
  privateKey: {
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(127, 127, 127, 0.2)',
    color: 'rgba(127, 127, 127, 0.5)',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    padding: 20,
  },
  extra: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100
  },
  extraLabel: {
    color: '#aaa',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
  },
  btnBackup: {
    color: '#000',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    backgroundColor: 'rgba(127, 127,127,0.2)',
    marginTop: 20,
  },
});
