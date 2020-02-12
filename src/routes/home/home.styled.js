import {StyleSheet} from 'react-native';
import {FONT} from '@src/styles';

export const bannerStyled = StyleSheet.create({
  banner: {
    backgroundColor: '#000',
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  imgContainer: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    bottom: 1,
    height: '50%',
  },
  introContainer: {
    padding: '20%',
    zIndex: 1,
  },
  settingsIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 2,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.superLarge,
    lineHeight: FONT.SIZE.superLarge + 10,
    marginBottom: 2
  },
  desc: {
    marginTop: 2,
    textAlign: 'center',
    color: '#fff',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular + 2,
    lineHeight: FONT.SIZE.regular + 8,
  },
});

export const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export const navsStyled = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'center',
    padding: '6%',
  },
});
