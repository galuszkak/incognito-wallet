import React from 'react';
import {View, Text, Clipboard, ScrollView, Share} from 'react-native';
import {compose} from 'recompose';
import {withHeader} from '@src/shared/components/header';
import {useSelector} from 'react-redux';
import {accountSeleclor} from '@src/redux/selectors';
import {BtnCopy, BtnLinear, Button} from '@src/shared/components/button';
import {Toast} from '@src/components/core';
import storageService from '@src/services/storage';
import {CONSTANT_KEYS} from '@src/constants';
import PropTypes from 'prop-types';
import {styled} from './backup.styled';
import {allPrivateKeysSelector} from './backup.selector';

const Item = ({name, PrivateKey, markBackupAcc}) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopyKey = () => {
    if (!copied) {
      Clipboard.setString(`${name}: ${PrivateKey}`);
      Toast.showInfo(`${name} private key was copied`);
      setCopied(true);
      markBackupAcc();
    }
  };
  return (
    <View style={styled.item}>
      <View style={styled.hook}>
        <Text style={styled.name}>{name}</Text>
        <BtnCopy onPress={handleCopyKey} />
      </View>
      <Text style={styled.privateKey}>{PrivateKey}</Text>
    </View>
  );
};

const Extra = ({markBackupAcc}) => {
  const allKeys = useSelector(allPrivateKeysSelector);
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: allKeys,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
          markBackupAcc();
          Toast.showInfo('Shared!');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Toast.showError(error.message);
    }
  };
  return (
    <View style={styled.extra}>
      <Text style={styled.extraLabel}>Back up all keys</Text>
      <Button
        title="Choose back up option"
        onPress={handleShare}
        btnStyle={styled.btnBackup}
      />
    </View>
  );
};

const Backup = () => {
  const [copied, setCopied] = React.useState(false);
  const listAccount = useSelector(accountSeleclor.listAccount);
  const allKeys = useSelector(allPrivateKeysSelector);
  const markBackupAcc = () => {
    storageService.setItem(
      CONSTANT_KEYS.IS_BACKEDUP_ACCOUNT,
      JSON.stringify(true),
    );
  };

  const handleCopyAllKeys = () => {
    if (!copied) {
      Clipboard.setString(allKeys);
      Toast.showInfo('All keys copied');
      setCopied(true);
      markBackupAcc();
    }
  };
  return (
    <ScrollView style={styled.container}>
      {listAccount.map(item => (
        <Item {...item} key={item.name} markBackupAcc={markBackupAcc} />
      ))}
      <Extra markBackupAcc={markBackupAcc} />
      <BtnLinear title="Copy all keys" onPress={handleCopyAllKeys} />
    </ScrollView>
  );
};

Backup.propTypes = {};

Item.propTypes = {
  name: PropTypes.string,
  PrivateKey: PropTypes.string,
  markBackupAcc: PropTypes.func,
};

Item.defaultProps = {
  name: '',
  PrivateKey: '',
  markBackupAcc: () => null,
};

Extra.propTypes = {
  markBackupAcc: PropTypes.func,
};

Extra.defaultProps = {
  markBackupAcc: () => null,
};

export default compose(
  Comp => props => <Comp {...props} headerTitle="Back up private keys" />,
  withHeader,
)(Backup);
