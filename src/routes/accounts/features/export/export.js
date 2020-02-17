import React from 'react';
import {View, StyleSheet, ScrollView, Text, Clipboard} from 'react-native';
import {useNavigationParam} from 'react-navigation-hooks';
import {withHeader} from '@src/shared/components/header';
import {compose} from 'recompose';
import {FONT} from '@src/styles';
import {MAIN_COLOR} from '@src/shared/stylesheet';
import {Button} from '@src/shared/components/button';

const styled = StyleSheet.create({
  container: {
    marginTop: -40,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
  },
  title: {
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: '#000',
    textTransform: 'uppercase',
  },
  desc: {
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 4,
    color: 'rgba(127, 127, 127, 0.5)',
  },
  btnCopy: {
    backgroundColor: MAIN_COLOR,
    color: '#000',
    fontFamily: FONT.NAME.bold,
    flex: 1,
  },
  hook: {
    flex: 3,
    paddingRight: 20,
  },
});

const Item = ({title, desc}) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopyText = () => {
    if (!copied) {
      Clipboard.setString(desc);
      setCopied(true);
    }
  };
  if (!desc) {
    return null;
  }
  return (
    <View style={styled.item}>
      <View style={styled.hook}>
        <Text style={styled.title}>{title}</Text>
        <Text style={styled.desc} ellipsizeMode="middle" numberOfLines={1}>
          {desc}
        </Text>
      </View>
      <Button
        onPress={handleCopyText}
        title={copied ? 'Copied' : 'Copy'}
        btnStyle={styled.btnCopy}
      />
    </View>
  );
};

const Export = props => {
  const account = useNavigationParam('account') || {
    PaymentAddress: '',
    PrivateKey: '',
    PublicKeyCheckEncode: '',
    ReadonlyKey: '',
    ValidatorKey: '',
    PublicKeyBytes: '',
  };
  const itemFactories = [
    {
      title: 'YOUR INCOGNITO ADDRESS',
      desc: account?.PaymentAddress || '',
    },
    {
      title: 'PRIVATE KEY',
      desc: account?.PrivateKey || '',
    },
    {
      title: 'PUBLIC KEY',
      desc: account?.PublicKeyCheckEncode || '',
    },
    {
      title: 'READONLY KEY',
      desc: account?.ReadonlyKey || '',
    },
    {
      title: 'VALIDATOR KEY',
      desc: account?.ValidatorKey || '',
    },
    {
      title: 'Shard',
      desc: account?.PublicKeyBytes || '',
    },
  ];
  return (
    <ScrollView style={styled.container}>
      {itemFactories.map((item, key) => (
        <Item key={key} {...item} />
      ))}
    </ScrollView>
  );
};

Export.propTypes = {};

export default compose(
  Comp => props => <Comp headerTitle="YOUR KEY" {...props} />,
  withHeader,
)(Export);
