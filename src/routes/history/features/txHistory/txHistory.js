import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {useNavigationParam} from 'react-navigation-hooks';
import srcOpenNewTab from '@src/assets/images/icons/openNewTab.png';
import linkingService from '@src/services/linking';
import {TouchableOpacity} from 'react-native-gesture-handler';
import QrCodeAddress from '@src/components/QrCodeAddress';
import {styled} from './txHistory.styled';

const Row = ({label = '', desc = '', isQrCode = false, isTxId = false}) => {
  if (!desc) {
    return null;
  }
  if (isQrCode) {
    return (
      <View style={styled.rowQrCode}>
        <Text styled={label}>{label}</Text>
        <QrCodeAddress data="" />
      </View>
    );
  }
  if (isTxId) {
    return (
      <View style={styled.row}>
        <View style={styled.labelContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styled.label}>
            {label}
          </Text>
        </View>
        <View
          style={[
            styled.descContainer,
            {
              flexDirection: 'row',
            },
          ]}
        >
          <Text numberOfLines={1} ellipsizeMode="middle" style={styled.desc}>
            {desc}
          </Text>
          <TouchableOpacity onPress={() => linkingService.openUrl(desc)}>
            <Image source={srcOpenNewTab} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={styled.row}>
      <View style={styled.labelContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styled.label}>
          {label}
        </Text>
      </View>
      <View style={styled.descContainer}>
        <Text style={styled.desc}>{desc}</Text>
      </View>
    </View>
  );
};

const TxHistory = () => {
  const {
    typeText,
    amount,
    statusText,
    id,
    time,
    incognitoTxID,
    toAddress,
    expiredAt,
    inchainTx,
    outchainTx,
    depositAddress,
  } = useNavigationParam('data');
  return (
    <ScrollView style={styled.container}>
      <Row label={`${typeText}:`} desc={amount} />
      <Row label="Status:" desc={statusText} />
      <Row label="ID:" desc={id} />
      <Row label="Time:" desc={time} />
      <Row label="Expired at:" desc={expiredAt} />
      <Row label="TxID:" desc={incognitoTxID} isTxId />
      <Row label="Inchain TxID:" desc={inchainTx} isTxId />
      <Row label="Outchain TxID:" desc={outchainTx} isTxId />
      <Row label="To address:" desc={toAddress} />
      <Row label="Deposit address:" desc={depositAddress} isQrCode />
    </ScrollView>
  );
};

TxHistory.propTypes = {};

export default TxHistory;
