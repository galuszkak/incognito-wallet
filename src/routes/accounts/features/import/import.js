import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {withHeader} from '@src/shared/components/header';
import {compose} from 'recompose';
import {BtnLinear, BtnScan} from '@src/shared/components/button';
import {useSelector, useDispatch} from 'react-redux';
import {accountSeleclor} from '@src/redux/selectors';
import {TextInput} from '@src/shared/components/input';
import {
  validateAccount,
  isExist,
  validatePrivateKey,
} from '@src/routes/accounts/accounts.utils';
import {CustomError, ErrorCode, ExHandler} from '@src/services/exception';
import {getPassphrase} from '@src/services/wallet/passwordService';
import accountService from '@src/services/wallet/accountService';
import {reloadAccountList} from '@src/redux/actions/wallet';
import {followDefaultTokens} from '@src/redux/actions/account';
import {randomAccountNameSelector} from '@src/routes/accounts/accounts.selector';
import Modal from '@src/shared/components/modal';
import {actionToggleModal} from '@src/shared/components/modal/modal.actions';
import QRCodeScanner from '@src/shared/components/QRCodeScanner';
import {Toast} from '@src/components/core';
import {styled} from './import.styled';
import {ACCOUNT_NAME_INPUT, PRIVATE_KEY_INPUT} from './import.constant';

const Import = props => {
  const [form, setFormDt] = React.useState({
    privateKey: {
      value: '',
      validated: {
        error: false,
        message: '',
      },
    },
    accountName: {
      value: useSelector(randomAccountNameSelector),
      validated: {
        error: false,
        message: '',
      },
    },
    editable: false,
    isFetching: false,
    isFetched: false,
    scan: false,
  });
  const {
    editable,
    isFetching,
    isFetched,
    [ACCOUNT_NAME_INPUT]: account,
    [PRIVATE_KEY_INPUT]: privateKey,
    scan,
  } = form;
  const accountList = useSelector(accountSeleclor.nameAccountList);
  const wallet = useSelector(state => state.wallet);
  const getAccountByName = useSelector(accountSeleclor.getAccountByName);
  const dispatch = useDispatch();
  let refAccountInput = React.createRef();
  let refPrivateKey = React.createRef();
  const handleEditAccount = () => {
    setFormDt({
      ...form,
      editable: true,
    });
    refAccountInput.focus();
  };

  const onChangeText = inputName => text =>
    setFormDt({
      ...form,
      [inputName]: {
        ...form[inputName],
        value: text,
        validated: {
          error: false,
          message: '',
        },
      },
    });
  const handleImportAccount = async () => {
    if (!isFetching && !isFetched) {
      try {
        const validatedAcc = validateAccount(account.value);
        const validatedPrvKey = validatePrivateKey(privateKey.value);
        if (validatedAcc.error) {
          return await setFormDt({
            ...form,
            account: {
              ...account,
              validated: {...validatedAcc},
            },
          });
        }
        if (validatedPrvKey.error) {
          return await setFormDt({
            ...form,
            privateKey: {
              ...privateKey,
              validated: {...validatedPrvKey},
            },
          });
        }
        if (isExist(account.value, accountList)) {
          throw new CustomError(ErrorCode.createAccount_existed_name);
        }
        await setFormDt({...form, isFetching: true});
        const passphrase = await getPassphrase();
        const isImported = await accountService.importAccount(
          privateKey.value,
          account.value,
          passphrase,
          wallet,
        );
        if (!isImported) throw new CustomError(ErrorCode.importAccount_failed);
        await dispatch(reloadAccountList());
        const accountFollow = getAccountByName(account.value);
        await dispatch(followDefaultTokens(accountFollow));
        await setFormDt({...form, isFetching: false, isFetched: true});
        Toast.showSuccess('Import successful!');
      } catch (error) {
        new ExHandler(
          error,
          'Import account failed, please try again.',
        ).showErrorToast();
        await setFormDt({...form, isFetching: false, isFetched: false});
      }
    }
  };
  const onScanPrivateKey = () => {
    setFormDt({...form, scan: true});
    dispatch(
      actionToggleModal({
        visible: true,
        data: <QRCodeScanner onRead={onRead} />,
      }),
    );
  };
  const onRead = e => {
    try {
      setFormDt({
        ...form,
        privateKey: {
          ...privateKey,
          value: e.data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styled.container}>
      <View style={styled.hook}>
        <View style={styled.inputContainer}>
          <TextInput
            ref={ref => (refAccountInput = ref)}
            maxLength={50}
            value={account.value}
            onChangeText={text => onChangeText(ACCOUNT_NAME_INPUT)(text)}
            validated={account.validated}
            style={styled.input}
            onSubmitEditing={() => refPrivateKey.focus()}
            editable={editable}
            label="Account name"
          />
        </View>
        {!editable && (
          <View style={styled.rightCol}>
            <TouchableOpacity onPress={handleEditAccount}>
              <Text style={styled.edit}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styled.hook}>
        <View style={styled.inputContainer}>
          <TextInput
            ref={ref => (refPrivateKey = ref)}
            value={form[PRIVATE_KEY_INPUT].value}
            onChangeText={text => onChangeText(PRIVATE_KEY_INPUT)(text)}
            maxLength={50}
            validated={form[PRIVATE_KEY_INPUT].validated}
            placeholder="Enter Private Key"
            style={styled.input}
            label="Private Key"
            onSubmitEditing={handleImportAccount}
          />
        </View>
        <View style={styled.rightCol}>
          <BtnScan btnStyle={styled.btnScan} onPress={onScanPrivateKey} />
        </View>
      </View>
      <BtnLinear
        disabled={isFetching}
        title={isFetching ? 'Importing...' : 'Import'}
        onPress={handleImportAccount}
      />
      {scan && <Modal />}
    </View>
  );
};

Import.propTypes = {};

export default compose(
  Comp => props => <Comp {...props} headerTitle="IMPORT ACCOUNT" />,
  withHeader,
)(Import);
