import {StyleSheet} from 'react-native';
import { COLORS } from '@src/styles';
import { BACKGROUND_GRAY } from '@src/shared/stylesheet';

export const styled = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_GRAY,
    flex: 1,
  },
});

export const actionsStyled = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: -60,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical: 15
  },
  styledContainer: {
    marginTop: 0,
  },
});
