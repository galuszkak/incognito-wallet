import React from 'react';
import {View, StyleSheet} from 'react-native';
import {withHeader} from '@src/shared/components/header';
import {compose} from 'recompose';
import {BtnLinear} from '@src/shared/components/button';
import {TextInput} from '@src/shared/components/input';
import {useSelector, useDispatch} from 'react-redux';
import {accountSeleclor} from '@src/redux/selectors';
import {ErrorCode, CustomError, ExHandler} from '@src/services/exception';
import accountService from '@src/services/wallet/accountService';
import {Toast} from '@src/components/core';
import {followDefaultTokens} from '@src/redux/actions/account';
import {reloadAccountList} from '@src/redux/actions/wallet';
import {useNavigation} from 'react-navigation-hooks';
import AccountModel from '@src/models/account';
import {validateAccount, isExist} from './create.utils';

const styled = StyleSheet.create({
  container: {},
  form: {
    backgroundColor: '#fff',
    marginTop: -20,
    borderRadius: 8,
    padding: 20,
  },
});

const Create = props => {
  const initState = {
    value: '',
    validated: true,
    message: '',
  };
  const navigation = useNavigation();
  const [state, setState] = React.useState(initState);
  const {value, validated, isFetching, isFetched} = state;
  const accountList = useSelector(accountSeleclor.listAccount);
  const wallet = useSelector(state => state.wallet);
  const dispatch = useDispatch();
  const onChangeText = value =>
    setState({
      ...state,
      isFetching: false,
      isFetched: false,
      value,
      validated: {
        error: false,
        message: '',
      },
    });
  const handleCreateAccount = async () => {
    if (!isFetching && !isFetched) {
      try {
        await setState({...state, isFetching: true});
        const validate = validateAccount(value);
        if (validate.error) {
          return await setState({...state, validated: {...validate}});
        }
        if (isExist(value, accountList)) {
          throw new CustomError(ErrorCode.createAccount_existed_name);
        }
        const account = await accountService.createAccount(value, wallet);
        if (!account) {
          throw new CustomError(ErrorCode.createAccount_failed);
        }
        await dispatch(reloadAccountList());
        const serializedAccount = new AccountModel(
          accountService.toSerializedAccountObj(account),
        );
        await dispatch(followDefaultTokens(serializedAccount));
        Toast.showInfo('Success! Account created.');
        await setState({
          ...state,
          isFetched: true,
          isFetching: false,
        });
        navigation.goBack();
      } catch (e) {
        new ExHandler(
          e,
          'Account was not created! Please try again.',
        ).showErrorToast();
        await setState({...state, isFetching: false, isFetched: false});
      }
    }
  };
  return (
    <View style={styled.container}>
      <View style={styled.form}>
        <TextInput
          label="ACCOUNT NAME"
          placeholder="Account Name"
          value={value}
          onChangeText={onChangeText}
          autoFocus
          onSubmitEditing={handleCreateAccount}
          maxLength={50}
          validated={validated}
        />
      </View>
      <BtnLinear
        title={isFetching ? 'Creating...' : 'Create account'}
        onPress={handleCreateAccount}
        style={
          isFetching
            ? {
                opacity: 0.5,
              }
            : null
        }
      />
    </View>
  );
};

Create.propTypes = {};

export default compose(
  Comp => props => <Comp {...props} headerTitle="CREATE ACCOUNT" />,
  withHeader,
)(Create);
