import React from 'react';
import {View, StyleSheet} from 'react-native';
import {withHeader} from '@src/shared/components/header';
import {compose} from 'recompose';
import {BtnLinear} from '@src/shared/components/button';
import {TextInput} from '@src/shared/components/input';
import {useSelector, useDispatch} from 'react-redux';
import {accountSeleclor} from '@src/redux/selectors';
import {ErrorCode, CustomError, ExHandler} from '@src/services/exception';
import {actionCreateAccount} from '@src/redux/actions/account';
import {useNavigation} from 'react-navigation-hooks';
import {validateAccount, isExist} from '@src/routes/accounts/accounts.utils';
import {createAccountSelector} from '@src/routes/accounts/accounts.selector';

const styled = StyleSheet.create({
  container: {},
  form: {
    backgroundColor: '#fff',
    marginTop: -20,
    borderRadius: 8,
    padding: 20,
  },
});

const Create = () => {
  const initState = {
    value: '',
    validated: true,
    message: '',
  };
  const navigation = useNavigation();
  const [state, setState] = React.useState(initState);
  const {isFetching} = useSelector(createAccountSelector);
  const {value, validated} = state;
  const accountList = useSelector(accountSeleclor.listAccount);
  const dispatch = useDispatch();
  const onChangeText = value =>
    setState({
      ...state,
      value,
      validated: {
        error: false,
        message: '',
      },
    });
  const handleCreateAccount = async () => {
    if (!isFetching) {
      try {
        const validate = validateAccount(value);
        if (validate.error) {
          return await setState({
            ...state,
            validated: {...validate},
          });
        }
        if (isExist(value, accountList)) {
          throw new CustomError(ErrorCode.createAccount_existed_name);
        }
        await dispatch(actionCreateAccount({accountName: value, navigation}));
      } catch (e) {
        new ExHandler(
          e,
          'Account was not created! Please try again.',
        ).showErrorToast();
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
        disabled={isFetching}
        title={isFetching ? 'Creating...' : 'Create account'}
        onPress={handleCreateAccount}
      />
    </View>
  );
};

Create.propTypes = {};

export default compose(
  Comp => props => <Comp {...props} headerTitle="CREATE ACCOUNT" />,
  withHeader,
)(Create);
