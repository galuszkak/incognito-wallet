import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

function Token(props) {
  const { playerToken, onSelect } = props;
  const { token } = playerToken;
  return (
    <TouchableOpacity
      style={styles.token}
      onPress={() => onSelect(playerToken)}
    >
      <View>
        <Text style={styles.tokenName}>{token.name}</Text>
        <Text style={styles.tokenSymbol}>{token.symbol}</Text>
      </View>
      <View>
        <Text style={styles.tokenNumber}>{playerToken.displayNumber}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  token: {
    margin: 15,
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tokenName: {
    color: '#101111',
    fontSize: 16,
  },
  tokenSymbol: {
    color: '#9AB7B8',
    fontSize: 14,
  },
  tokenNumber: {
    fontSize: 16,
    color: '#101111',
  },
});

Token.propTypes = {
  onSelect: PropTypes.func.isRequired,
  playerToken: PropTypes.shape({
    token: PropTypes.shape({
      symbol: PropTypes.string,
      number: PropTypes.number,
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default React.memo(Token);
