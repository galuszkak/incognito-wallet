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
    width: 17,
    height: 18,
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
