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
import {actionImportAccount} from '@src/redux/actions/account';
import {
  randomAccountNameSelector,
  importAccountSelector,
} from '@src/routes/accounts/accounts.selector';
import Modal from '@src/shared/components/modal';
import {actionToggleModal} from '@src/shared/components/modal/modal.actions';
import QRCodeScanner from '@src/shared/components/QRCodeScanner';
import {useNavigation} from 'react-navigation-hooks';
import {styled} from './import.styled';
import {ACCOUNT_NAME_INPUT, PRIVATE_KEY_INPUT} from './import.constant';

const Import = () => {
  const navigation = useNavigation();
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
    scan: false,
  });
  const {
    editable,
    [ACCOUNT_NAME_INPUT]: account,
    [PRIVATE_KEY_INPUT]: privateKey,
    scan,
  } = form;
  const nameAccountList = useSelector(accountSeleclor.nameAccountList);
  const {isFetching} = useSelector(importAccountSelector);
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
    if (!isFetching) {
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
        if (isExist(account.value, nameAccountList)) {
          throw new CustomError(ErrorCode.createAccount_existed_name);
        }
        await dispatch(
          actionImportAccount({
            privateKey: privateKey.value,
            accountName: account.value,
            navigation,
          }),
        );
      } catch (error) {
        new ExHandler(
          error,
          'Import account failed, please try again.',
        ).showErrorToast();
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
  const onRead = async e => {
    try {
      await setFormDt({
        ...form,
        privateKey: {
          ...privateKey,
          value: e.data,
        },
        scan: false,
      });
      await dispatch(actionToggleModal({visible: false, data: null}));
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
