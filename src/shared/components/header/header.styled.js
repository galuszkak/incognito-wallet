import {StyleSheet} from 'react-native';
import {FONT} from '@src/styles';
import {BACKGROUND_GRAY} from '@src/shared/stylesheet';

export const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_GRAY,
  },
  wrappedComp: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export const headerStyled = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 176,
  },
  arrowContainer: {
    marginRight: 20,
  },
  title: {
    textTransform: 'uppercase',
    color: '#fff',
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.large,
    lineHeight: FONT.SIZE.large + 6,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
