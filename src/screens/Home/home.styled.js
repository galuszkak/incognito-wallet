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
  navItem: {
    textAlign: 'center',
    alignItems: 'center',
    padding: '2%',
    width: `${100 / 3}%`,
    marginTop: 20
  },
  icon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: FONT.NAME.regular,
    color: '#000',
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 10,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 2,
  },
  desc: {
    fontFamily: FONT.NAME.regular,
    color: 'rgba(0,0,0,0.8)',
    fontSize: FONT.SIZE.small,
    lineHeight: FONT.SIZE.small + 6,
    textAlign: 'center',
  },
});
