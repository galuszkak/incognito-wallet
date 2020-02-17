import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  getDecimalSeparator,
  setDecimalSeparator as saveDecimalSeparator,
} from '@src/resources/separator';
import Switch from '@src/shared/components/switch';

const styled = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
});

const Decimal = props => {
  const [decimalSeparator, setDecimalSeparator] = React.useState(
    getDecimalSeparator(),
  );

  const togglePin = () => {
    if (decimalSeparator === '.') {
      setDecimalSeparator(',');
      saveDecimalSeparator(',');
    } else {
      setDecimalSeparator('.');
      saveDecimalSeparator('.');
    }
  };
  return (
    <View style={styled.container}>
      <Text>Use decimal comma instead of point</Text>
      <Switch onValueChange={togglePin} value={decimalSeparator === ','} />
    </View>
  );
};

Decimal.propTypes = {};

export default Decimal;
