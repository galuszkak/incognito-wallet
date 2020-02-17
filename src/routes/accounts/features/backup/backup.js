import React from 'react';
import {View, Text, Clipboard, ScrollView, Share} from 'react-native';
import {compose} from 'recompose';
import {withHeader} from '@src/shared/components/header';
import {useSelector} from 'react-redux';
import {accountSeleclor} from '@src/redux/selectors';
import {BtnCopy, BtnLinear, Button} from '@src/shared/components/button';
import {Toast} from '@src/components/core';
import {styled} from './backup.styled';
import {allPrivateKeysSelector} from './backup.selector';

const Item = ({name, PrivateKey}) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopyKey = () => {
    if (!copied) {
      Clipboard.setString(`${name}: ${PrivateKey}`);
      Toast.showInfo(`${name} private key was copied`);
      setCopied(true);
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

const Extra = () => {
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
  const handleCopyAllKeys = () => {
    if (!copied) {
      Clipboard.setString(allKeys);
      Toast.showInfo('All keys copied');
      setCopied(true);
    }
  };
  return (
    <ScrollView style={styled.container}>
      {listAccount.map(item => (
        <Item {...item} key={item.name} />
      ))}
      <Extra />
      <BtnLinear title="Copy all keys" onPress={handleCopyAllKeys} />
    </ScrollView>
  );
};

Backup.propTypes = {};

export default compose(
  Comp => props => <Comp {...props} headerTitle="Back up private keys" />,
  withHeader,
)(Backup);
