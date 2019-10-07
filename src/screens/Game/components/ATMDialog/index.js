import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import axios from 'axios';
import { ScrollView } from '@src/components/core';
import Config from '@src/constants/config';
import {MAX_TOKEN, screenHeight, screenWidth} from '../../constants';
import Token from './Token';
import ExchangeDialog from './ExchangeDialog';

const MAX_PER_DAY = 333;
const MIN_PER_PEOPLE = 1;
const { GET_QUOTE_URL, MARKET_KEY } = Config;

async function getConvertRate(tokens) {
  // try {
  //   console.log('GET_QUOTE_URL', GET_QUOTE_URL, MARKET_KEY, tokens);
  //   const symbols = tokens.map(token => token.symbol);
  //   const res = await axios.get(`${GET_QUOTE_URL}?symbol=${symbols.join(',')}`, {
  //     headers: {
  //       'X-CMC_PRO_API_KEY': MARKET_KEY,
  //     }
  //   });
  //   const data = res.data.data;
  //   // const data =
  //
  //   console.log('DATA', JSON.stringify(data));
  //
  //   const totalPRV = tokens.reduce((sum, token) => sum + (token.price * (MAX_TOKEN - token.number)), 0);
  //   const convertRate = {};
  //
  //   tokens.forEach(token => {
  //     const rate = {};
  //     rate.price = (token.price / totalPRV) * MAX_PER_DAY;
  //     rate.rate = rate.price / data[token.symbol.toUpperCase()].quote.USD;
  //     rate.min = Math.ceil(MIN_PER_PEOPLE / rate.price);
  //
  //     convertRate[token.symbol] = rate;
  //   });
  //
  //   console.log('Convert rate', JSON.stringify(convertRate));
  //
  //   return convertRate;
  // } catch (error) {
  //   console.log('Error', JSON.stringify(error));
  // }

  const convertRate = {'TOMO':{'price':0.0017507379483588917,'rate':null,'min':571},'FTM':{'price':0.07143010829304278,'rate':null,'min':13},'KNC':{'price':0.007936678699226974,'rate':null,'min':125},'ZIL':{'price':0.11905018048840463,'rate':null,'min':8},'VET':{'price':0.01831541238283148,'rate':null,'min':54},'KCS':{'price':0.07143010829304278,'rate':null,'min':13},'MKR':{'price':0.00757592057653484,'rate':null,'min':131},'BAT':{'price':0.11111350178917766,'rate':null,'min':8},'OMG':{'price':0.0013954599910728745,'rate':null,'min':716},'BNT':{'price':0.0031959779996887146,'rate':null,'min':312},'DCR':{'price':0.011905018048840463,'rate':null,'min':83},'ATOM':{'price':0.0019569892683025418,'rate':null,'min':510},'NEO':{'price':0.0020008433695530192,'rate':null,'min':499},'ETC':{'price':0.001215361471343342,'rate':null,'min':822},'XTZ':{'price':0.0010582238265635967,'rate':null,'min':944},'ADA':{'price':0.03571505414652139,'rate':null,'min':27},'USDC':{'price':0.0015214080573598037,'rate':null,'min':657},'TRX':{'price':0.002234877034439365,'rate':null,'min':447},'XLM':{'price':0.001142178853394288,'rate':null,'min':875},'EOS':{'price':0.008333512634188325,'rate':null,'min':119},'XRP':{'price':0.001781299458679371,'rate':null,'min':561},'LTC':{'price':0.0015733504029304577,'rate':null,'min':635},'BCH':{'price':0.002202084263369334,'rate':null,'min':454},'BNB':{'price':0.0029762545122101157,'rate':null,'min':335},'ETH':{'price':0.0012626534294224731,'rate':null,'min':791},'BTC':{'price':0.004859191040343046,'rate':null,'min':205}};
  return convertRate;
}

function ATMDialog(props) {
  const { cells, visible, onConfirmPrice, onCancel, player } = props;
  const [playerToken, setPlayerToken] = React.useState({});
  const [isShowingPriceDialog, setIsShowingPriceDialog] = React.useState(false);
  const [convertRate, setConvertRate] = React.useState([]);
  const onSelectCell = (selectedPlayerToken) => {
    setPlayerToken(selectedPlayerToken);
    setIsShowingPriceDialog(true);
  };

  React.useEffect(() => {
    setIsShowingPriceDialog(false);
    setPlayerToken({});
  }, [visible]);

  React.useEffect(() => {
    if (cells && cells.length > 0) {
      const tokens = cells
        .filter(cell => cell.token)
        .map(cell => cell.token);
      getConvertRate(tokens)
        .then(setConvertRate);
    }
  }, [cells]);

  return (
    <Dialog visible={visible} style={styles.dialog}>
      {player.tokens ? (
        <View>
          <DialogContent style={styles.content}>
            <View>
              <Text style={[styles.cellName, styles.center]}>
                ATM
              </Text>
              <Text style={[styles.description]}>
                Taste the rainbow. Exchange your game token to real token here.
              </Text>
            </View>
            <ScrollView style={styles.scrollView}>
              {player.tokens
                .filter(playerToken => playerToken.displayNumber > 0)
                .map((playerToken) => (
                  <Token
                    key={playerToken.tokenId}
                    playerToken={playerToken}
                    onSelect={onSelectCell}
                  />
                ))}
            </ScrollView>
          </DialogContent>
          <ExchangeDialog
            onCancel={() => setIsShowingPriceDialog(false)}
            onConfirmPrice={onConfirmPrice}
            playerToken={playerToken}
            convertRate={convertRate}
            visible={isShowingPriceDialog}
            confirmText="Buy"
          />
          <View style={[styles.center, styles.actions]}>
            <TouchableOpacity onPress={onCancel} style={[styles.center, styles.closeButton]}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      ): null
      }
    </Dialog>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 30,
    width: screenWidth,
    height: screenHeight - 80,
    backgroundColor: '#9AB7B8',
  },
  scrollView: {
    marginTop: 20,
    maxHeight: '80%',
  },
  closeButton: {
    width: 120,
    height: 32,
    backgroundColor: '#014E52',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    height: 80,
    padding: 30,
  },
  buttonText: {
    color: 'white'
  },
  cellName: {
    width: '100%',
    backgroundColor: '#FF4B47',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 5,
    marginBottom: 10,
  },
});

ATMDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onConfirmPrice: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  cells: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number,
    token: PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.number,
      symbol: PropTypes.string,
    })
  })).isRequired,
  player: PropTypes.shape({

  }).isRequired,
};

export default React.memo(ATMDialog);
