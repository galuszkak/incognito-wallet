import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreateSendToken from './CreateSendToken';

const CreateSendTokenContainer = ({ wallet, defaultAccount, navigation, isPrivacy, isCreate, ...otherProps}) => {
  const _isPrivacy = isPrivacy ?? navigation.getParam('isPrivacy');
  const _isCreate = isCreate ?? navigation.getParam('isCreate');
  
  return <CreateSendToken wallet={wallet} account={defaultAccount} isPrivacy={_isPrivacy} isCreate={_isCreate} {...otherProps} />;
};

const mapState = state => ({
  defaultAccount: state.account.defaultAccount,
  wallet: state.wallet,
  isPrivacy: false,
  isCreate: true,
});

CreateSendTokenContainer.propTypes = {
  defaultAccount: PropTypes.object,
  wallet: PropTypes.object,
  isPrivacy: PropTypes.bool,
  isCreate: PropTypes.bool,
  navigation: PropTypes.object
};

export default connect(mapState)(CreateSendTokenContainer);