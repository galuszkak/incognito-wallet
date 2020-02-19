import {StyleSheet} from 'react-native';

export const styled = StyleSheet.create({
  container: {
    marginTop: -20,
    flex: 1
  },
  btnLinear: {
    marginTop: 20
  }
});

export const actionsStyled = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,

  },
  styledContainer: {
    marginTop: 0,
  },
});
