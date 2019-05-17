import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreateSendToken from './CreateSendToken';

const CreateSendTokenContainer = ({ wallet, defaultAccount, navigation, ...otherProps}) => {
  const isPrivacy = navigation.getParam('isPrivacy');
  const isCreate = navigation.getParam('isCreate');
  const reloadListFollowToken = navigation.getParam('reloadListFollowToken');
  const token = navigation.getParam('token');
  
  return (<CreateSendToken 
    wallet={wallet} 
    account={defaultAccount} 
    isPrivacy={isPrivacy} 
    isCreate={isCreate} 
    reloadListFollowToken={reloadListFollowToken} 
    token={token} 
    {...otherProps}  
  />);
};

const mapState = state => ({
  defaultAccount: state.account.defaultAccount,
  wallet: state.wallet
});

CreateSendTokenContainer.propTypes = {
  defaultAccount: PropTypes.object,
  wallet: PropTypes.object,
  isPrivacy: PropTypes.bool,
  isCreate: PropTypes.bool,
  navigation: PropTypes.object
};

export default connect(mapState)(CreateSendTokenContainer);