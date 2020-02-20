import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {useNavigation} from 'react-navigation-hooks';
import routeNames from '@src/router/routeNames';
import {itemStyled as styled} from './history.styled';
import {mappingData, defaultHistoryItem} from './history.utils';

const HistoryItem = props => {
  const navigation = useNavigation();
  const {data, isLastChild} = props;
  const dataMapping = mappingData(data);
  const {
    statusText,
    statusColor,
    statusNumber,
    typeText,
    amount,
    time,
    balanceColor
  } = dataMapping;
  const handleOnPress = () => {
    navigation.navigate(routeNames.TxHistoryDetail, {data: dataMapping});
  };
  if (!data) {
    return null;
  }
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={[styled.container, isLastChild ? styled.lastChild : null]}>
        <View style={styled.row}>
          <Text style={styled.typeText}>{typeText}</Text>
          <Text style={styled.time}>{time}</Text>
        </View>
        <View style={styled.row}>
          <Text style={[styled.amount, {color: balanceColor}]}>{amount}</Text>
          <Text style={[styled.statusText, {color: statusColor}]}>
            {statusText}
            {!!statusNumber || statusNumber === 0 ? `[${statusNumber}]` : null}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

HistoryItem.defaultProps = {
  data: defaultHistoryItem,
  isLastChild: false,
};

HistoryItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    time: PropTypes.string,
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    symbol: PropTypes.string,
    fromAddress: PropTypes.string,
    toAddress: PropTypes.string,
    statusCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cancelable: PropTypes.bool,
    canRetryExpiredDeposit: PropTypes.bool,
    pDecimals: PropTypes.number,
    requestedAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string,
    expiredAt: PropTypes.string,
    depositAddress: PropTypes.string,
    userPaymentAddress: PropTypes.string,
    erc20TokenAddress: PropTypes.string,
    privacyTokenAddress: PropTypes.string,
    walletAddress: PropTypes.string,
  }),
  isLastChild: PropTypes.bool,
};

export default HistoryItem;
