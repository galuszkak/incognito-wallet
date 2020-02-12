import {StyleSheet, Platform} from 'react-native';
import {COLORS} from '@src/styles';

const FLAG_SIZE = 14;

export default StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedFlagContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: FLAG_SIZE,
    height: FLAG_SIZE,
    borderRadius: FLAG_SIZE,
    marginLeft: 10,
  },
  verifiedFlag: {
    color: COLORS.green,
    ...(Platform.OS === 'ios'
      ? {
          height: FLAG_SIZE,
          width: FLAG_SIZE,
        }
      : {}),
  },
  text: {
    alignSelf: 'flex-start',
  },
});
