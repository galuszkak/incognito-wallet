import React from 'react';
import {View, RefreshControl, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {styled} from './history.styled';
import withHistory from './history.enhance';
import HistoryItem from './history.item';

const History = props => {
  // const {data} = props;
  //TODO: fake data
  const types = [1, 2, 3, 4];
  const statusArr = ['SUCCESS', 'FAILED', 'PENDING', 'EXPIRED'];
  const symbolArr = ['pPRV', 'pETH', 'pBTC', 'pUSDT'];
  const data = [...Array(10)].map((item, key) => ({
    id: key,
    time: new Date().getTime(),
    type: types[Math.floor(Math.random() * 4)],
    status: statusArr[Math.floor(Math.random() * 4)],
    symbol: symbolArr[Math.floor(Math.random() * 4)],
    amount: Math.floor(Math.random() * 1000),
    statusCode: 0,
    requestedAmount: 0,
    incognitoTxID: '0x32be343b94f860124dc4fee278fdcbd38c102d88',
    inchainTx: '0x32be343b94f860124dc4fee278fdcbd38c102d88',
    outchainTx: '0x32be343b94f860124dc4fee278fdcbd38c102d88',
    depositAddress: '0x32be343b94f860124dc4fee278fdcbd38c102d88',
  }));
  return (
    <ScrollView style={styled.container}>
      {data.map((item, key, arr) => (
        <HistoryItem
          data={item}
          key={item.id}
          isLastChild={arr.length - 1 === key}
        />
      ))}
    </ScrollView>
  );
};

History.propTypes = {
  data: PropTypes.array.isRequired,
};

// export default withHistory(History);
export default History;
