import QRCodeScannerBase from 'react-native-qrcode-scanner';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {BtnBack} from '@src/shared/components/button';
import {useDispatch} from 'react-redux';
import {FONT} from '@src/styles';
import {actionToggleModal} from '../modal/modal.actions';

const styled = StyleSheet.create({
  container: {
    borderWidth: 1,
    flex: 1,
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    color: '#000',
  },
  btnBack: {
    padding: 20,
  },
  cameraStyle: {
    width: '100%',
    height: '100%',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  scan: {
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: '#fff',
  },
  scanContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});

const QRCodeScanner = props => {
  const dispatch = useDispatch();
  const handleBack = () => {
    dispatch(
      actionToggleModal({
        visible: false,
        data: null,
      }),
    );
  };
  return (
    <View style={styled.container}>
      <View style={styled.topContainer}>
        <BtnBack style={styled.btnBack} onPress={handleBack} />
        <View style={styled.scanContainer}>
          <Text style={styled.scan}>Scan QRCode</Text>
        </View>
      </View>
      <QRCodeScannerBase
        showMarker
        cameraStyle={styled.cameraStyle}
        notAuthorizedView={(
          <View>
            <Text>Need camera permission</Text>
          </View>
        )}
        permissionDialogMessage="Need camera permission"
        {...props}
      />
    </View>
  );
};

export default QRCodeScanner;
