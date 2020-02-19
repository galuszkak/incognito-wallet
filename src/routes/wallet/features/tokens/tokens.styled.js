import {StyleSheet} from 'react-native';
import {FONT} from '@src/styles';

export const styled = StyleSheet.create({
  container: {
    borderRadius: 8,
    position: 'relative',
    marginTop: -25,
    backgroundColor: '#fff',
  },
});

export const styledBtn = StyleSheet.create({
  bg: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: 50,
    marginVertical: 10,
  },
  title: {
    color: '#000',
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.regular,
    position: 'absolute',
    zIndex: 1,
  },
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
});

export const styledExtra = StyleSheet.create({
  container: {},
  hook: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 10,
    marginBottom: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: FONT.SIZE.regular - 2,
    lineHeight: FONT.SIZE.regular + 4,
    fontFamily: FONT.NAME.regular,
  },
  nav: {
    textDecorationLine: 'underline',
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 4,
    color: '#000',
    textAlign: 'center',
    marginRight: 10,
  },
  arrow: {},
});
