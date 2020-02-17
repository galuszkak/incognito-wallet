import {StyleSheet} from 'react-native';
import {BACKGROUND_GRAY} from '@src/shared/stylesheet';
import {FONT} from '@src/styles';

export const styled = StyleSheet.create({
  extra: {
    marginTop: -20,
    position: 'relative',
    zIndex: 1,
  },
  hookContainer: {
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  heading: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: '#aaa',
    textTransform: 'uppercase',
  },
});
