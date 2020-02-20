import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {BtnClose} from '@src/shared/components/button';
import {useDispatch, useSelector} from 'react-redux';
import {actionToggleModal} from '@src/shared/components/modal/modal.actions';
import {FONT} from '@src/styles';
import {accountSeleclor} from '@src/redux/selectors';
import srcChecked from '@src/assets/images/icons/checked_linear.png';
import srcAccount from '@src/assets/images/icons/account_icon_wallet.png';
import srcAccountActived from '@src/assets/images/icons/account_icon_actived_wallet.png';
import {defaultAccountSelector} from '@src/shared/selectors';
import {Toast} from '@src/components/core';
import {ExHandler} from '@src/services/exception';
import {switchAccount} from '@src/redux/actions/account';

const styled = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#fff',
    bottom: 0,
    borderRadius: 8,
    zIndex: 1,
    padding: 20,
  },
  hook: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: '#aaa',
    textTransform: 'uppercase',
  },
  accounts: {},
  account: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderBottomColor: 'rgba(127, 127, 127,0.1)',
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  iconAccount: {
    width: 54,
    height: 54,
  },
  iconChecked: {
    width: 24,
    height: 24,
  },
  name: {
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: '#000',
    flex: 1,
    paddingHorizontal: 20,
  },
  lastChild: {
    borderBottomColor: 'transparent',
  },
});

const Account = props => {
  const {name, isLastChild = false} = props;
  const defaultAccount = useSelector(defaultAccountSelector);
  const isActived = name === defaultAccount;
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    isFetched: false,
    isFetching: false,
  });
  const {isFetching} = state;
  const handleSwitchAccount = async () => {
    if (!isFetching) {
      try {
        if (defaultAccount === name) {
          return Toast.showInfo(`Your current account is "${name}"`);
        }
        await setState({...state, isFetching: true});
        await dispatch(switchAccount(name));
        await setState({...state, isFetched: true});
        Toast.showInfo(`Switched to account "${name}"`);
      } catch (e) {
        new ExHandler(
          e,
          `Can not switch to account "${name}", please try again.`,
        ).showErrorToast();
      } finally {
        await setState({...state, isFetching: false});
        await dispatch(
          actionToggleModal({
            visible: false,
            data: null,
          }),
        );
      }
    }
  };
  return (
    <TouchableOpacity onPress={handleSwitchAccount}>
      <View style={[styled.account, isLastChild ? styled.lastChild : null]}>
        <Image
          style={styled.iconAccount}
          source={isActived ? srcAccountActived : srcAccount}
        />
        <Text style={styled.name}>{name}</Text>
        {isActived && <Image source={srcChecked} style={styled.iconChecked} />}
        {isFetching && <ActivityIndicator size="small" />}
      </View>
    </TouchableOpacity>
  );
};

const Accounts = () => {
  const listAccount = useSelector(accountSeleclor.listAccount);
  return (
    <View style={styled.accounts}>
      {listAccount.map((item, index, arr) => (
        <Account
          key={item.name}
          {...item}
          isLastChild={index === arr.length - 1}
        />
      ))}
    </View>
  );
};

const ChangeAccount = () => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(
      actionToggleModal({
        visible: false,
        data: null,
      }),
    );
  };
  return (
    <View style={styled.container}>
      <View style={styled.hook}>
        <Text style={styled.title}>CHANGE ACCOUNT</Text>
        <BtnClose onPress={handleCloseModal} />
      </View>
      <Accounts />
    </View>
  );
};

ChangeAccount.propTypes = {};

export default ChangeAccount;
