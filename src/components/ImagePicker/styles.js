import { COLORS } from '@src/styles';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    flexBasis: 100,
    backgroundColor: COLORS.lightGrey10,
    marginRight: 30,
    overflow: 'hidden'
  },
  rightContainer: {
    flex: 1
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  button: {
    backgroundColor: COLORS.transparent,
    borderWidth: 1,
    borderColor: COLORS.primary,
    maxWidth: 300
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 14,
    letterSpacing: 0,
    marginHorizontal: 30,
  },
  text: {
    fontSize: 14,
    marginVertical: 10,
    letterSpacing: 0
  }
});

export default style;
