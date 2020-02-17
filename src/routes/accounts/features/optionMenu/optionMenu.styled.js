import {StyleSheet} from 'react-native';
import {FONT} from '@src/styles';

export const styled = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#fff',
    bottom: 0,
    borderRadius: 8,
    zIndex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(127, 127 ,127, 0.2)',
  },
  lastItem: {
    borderBottomColor: 'transparent',
  },
  infoContainer: {},
  icon: {
    marginRight: 20,
  },
  label: {
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: '#000',
  },
  desc: {
    color: 'rgba(127, 127, 127, 0.3)',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
  },
  btnMore: {
    width: 20,
    height: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'relative',
  },
  btmLine: {
    height: 4,
    backgroundColor: '#000',
    borderRadius: 4,
    width: '40%',
    alignSelf: 'center',
    margin: 20,
  },
  btnClose: {
  },
  btnCloseContainer: {
    alignSelf: 'flex-end',
    margin: 20,
    padding: 5
  },
});
