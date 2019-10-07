import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Button } from '@src/components/core';

function ExchangeDialog(props) {
  const { visible, onConfirmPrice, onCancel, convertRate, playerToken } = props;
  const { token } = playerToken;

  let tokenConvertRate = { price: 0, min: 0 };

  if (token?.symbol) {
    tokenConvertRate = convertRate[token.symbol];
  }

  const [number, setNumber] = React.useState(1);
  const [walletAddress, setWalletAddress] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [isPaying, setIsPaying] = React.useState(false);
  const [realToken, setRealToken] = React.useState(0);
  const onChangeNumber = async (text) => {
    const number = _.toInteger(text);
    getPrice(number);
  };

  const onConfirm = () => {
    if (realToken > 0) {
      setIsPaying(true);
      onConfirmPrice(walletAddress, contact, token, number, realToken);
    }
  };
  const getPrice = number => {
    if (number <= 0) {
      setRealToken(0);
      setNumber(0);
    } else {
      setRealToken(tokenConvertRate.price * number);
      setNumber(number);
    }
  };

  React.useEffect(() => {
    setRealToken(0);
    setNumber(1);
    setIsPaying(false);
  }, [visible]);

  const disabled =
    realToken <= 0 || number <= 0 || number > token?.number || isPaying || _.trim(walletAddress).length === 0;

  return (
    <Dialog visible={visible} style={styles.dialog}>
      <DialogContent style={styles.content}>
        { token ?
          <View>
            <Text style={[styles.tokenName, styles.center]}>
              {token.name} ({token.symbol})
            </Text>
            <Text>
              {token.symbol} Balance: {playerToken.displayNumber}
            </Text>
            <Text>
              Exchange rate: {_.round(tokenConvertRate.price, 5)}
            </Text>
            <Text>
              Minimum game tokens required: {tokenConvertRate.min}
            </Text>
            <Text>
              Real tokens you&apos;ll received: {_.round(realToken, 5)}
            </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, paddingLeft: 5, paddingRight: 5}}
              onChangeText={onChangeNumber}
              placeholder="Number of game tokens you want to exchange"
              keyboardType="number-pad"
            />
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, paddingLeft: 5, paddingRight: 5}}
              onChangeText={setWalletAddress}
              placeholder="Receiving Address"
            />
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, paddingLeft: 5, paddingRight: 5}}
              onChangeText={setContact}
              placeholder="Your email in case something goes wrong (optional)"
            />
            <View style={[styles.actions, styles.center]}>
              <Button
                type="secondary"
                style={[styles.center, styles.button]}
                onPress={onCancel}
                title="Cancel"
                titleStyle={styles.buttonText}
              />
              <Button
                style={[styles.center, styles.button]}
                type="primary"
                disabled={disabled}
                onPress={onConfirm}
                title="Confirm"
                titleStyle={styles.buttonText}
              />
            </View>
          </View> : null
        }
      </DialogContent>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  dialog: {
    width: 300,
    height: 245,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  tokenName: {
    width: '100%',
    backgroundColor: '#FF4B47',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 5,
    marginBottom: 10,
  },
  content: {
    padding: 10,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 52,
    minHeight: 52,
    height: 62,
    marginTop: 5,
  },
  button: {
    width: 100,
    height: 32,
    margin: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

ExchangeDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onConfirmPrice: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  playerToken: PropTypes.shape({
    token: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.number,
      symbol: PropTypes.string,
      balance: PropTypes.number,
      price: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

ExchangeDialog.defaultProps = {
  remaining: null,
};

export default React.memo(ExchangeDialog);
