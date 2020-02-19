import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {withHeader} from '@src/shared/components/header/';
import {compose} from 'recompose';
import Modal, {modalSelector} from '@src/shared/components/modal';
import {actionToggleModal} from '@src/shared/components/modal/modal.actions';
import {headingStyled} from './wallet.styled';
import Tokens from './features/tokens';
import ChangeAccount from './features/changeAccount';

const Heading = () => {
  const account = useSelector(state => state.account);
  const {visible} = useSelector(modalSelector);
  const dispatch = useDispatch();
  const handleChangeAccount = () => {
    dispatch(
      actionToggleModal({
        visible: true,
        data: <ChangeAccount />,
      }),
    );
  };
  return (
    <View style={headingStyled.container}>
      <View style={headingStyled.leftCol}>
        <Text style={headingStyled.title}>WALLET</Text>
        <Text style={headingStyled.accountName}>
          {account.defaultAccountName}
        </Text>
      </View>
      <View style={headingStyled.rightCol}>
        {!visible ? (
          <TouchableOpacity onPress={handleChangeAccount}>
            <Text style={headingStyled.btnChangeAcc}>Change account</Text>
          </TouchableOpacity>
        ) : (
          <Modal />
        )}
      </View>
    </View>
  );
};

const Wallet = () => {
  return <Tokens />;
};

Wallet.propTypes = {};

export default compose(
  Comp => props => <Comp {...props} isFirstRoute rightCol={<Heading />} />,
  withHeader,
)(Wallet);
