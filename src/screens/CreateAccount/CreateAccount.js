import {
  Container,
  Button,
  View
} from '@src/components/core';
import { Field } from 'redux-form';
import { createForm, InputField, validator } from '@src/components/core/reduxForm';
import PropTypes from 'prop-types';
import React from 'react';
import { CustomError, ErrorCode, ExHandler } from '@src/services/exception';
import styleSheet from './style';

const formName = 'createAccount';
const Form = createForm(formName);

const CreateAccount = ({ navigation, accountList, createAccount }) => {
  const goBack = () => {
    navigation.popToTop();
  };

  const handleCreateAccount = async ({ accountName }) => {
    const lowerCase = str => String(str).toLowerCase();
    try {
      if (
        accountList?.find(
          _account => lowerCase(_account.name) === lowerCase(accountName)
        )
      ) {
        throw new CustomError(ErrorCode.createAccount_existed_name);
      }

      const account = await createAccount(accountName);

      if (!account) {
        throw new CustomError(ErrorCode.createAccount_failed);
      }

      // switch to this account
      const onSwitchAccount = navigation?.getParam('onSwitchAccount');
      if (typeof onSwitchAccount === 'function') {
        onSwitchAccount(account);
      }

      goBack();
    } catch (e) {
      new ExHandler(e, 'Account was not created! Please try again.').showErrorToast();
    }
  };

  return (
    <Container style={styleSheet.container}>
      <Form>
        {({ handleSubmit, submitting }) => (
          <View style={styleSheet.form}>
            <Field
              component={InputField}
              name='accountName'
              placeholder='Account Name'
              label='Account Name'
              validate={validator.combinedAccountName}
            />
            <Button
              title='Create account'
              style={styleSheet.submitBtn}
              onPress={handleSubmit(handleCreateAccount)}
              isAsync
              isLoading={submitting}
            />
          </View>
        )}
      </Form>
    </Container>
  );
};

CreateAccount.defaultProps = {
  accountList: [],
  createAccount: null
};

CreateAccount.propTypes = {
  navigation: PropTypes.object.isRequired,
  accountList: PropTypes.array,
  createAccount: PropTypes.func
};

export default CreateAccount;
