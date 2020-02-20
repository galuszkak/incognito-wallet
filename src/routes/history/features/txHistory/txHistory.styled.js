import {StyleSheet} from 'react-native';
import {FONT} from '@src/styles';

export const styled = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 8,
  },
  row: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelContainer: {
    flex: 1,
  },
  descContainer: {
    flex: 3,
    paddingRight: 20,
  },
  rowQrCode: {},
  label: {
    color: '#aaa',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.small + 2,
    lineHeight: FONT.SIZE.small + 6,
    marginRight: 20,
  },
  desc: {
    color: '#000',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.small + 2,
    lineHeight: FONT.SIZE.small + 6,
    paddingRight: 20,
  },
  txActionContainer: {
    backgroundColor: 'red',
    flexDirection: 'row',
  },
});
