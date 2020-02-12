import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import { sharedSeleclor, selectedPrivacySeleclor } from '@src/redux/selectors';

const enhance = WrappedComp => props => {
  const {tokenId} = props;
  const data = useSelector(state =>
    selectedPrivacySeleclor.getPrivacyDataByTokenID(state)(tokenId),
  );
  const isGettingBalance = useSelector(state =>
    sharedSeleclor.isGettingBalance(state),
  ).includes(tokenId);

  if (!data) {
    return null;
  }

  return (
    <WrappedComp
      props={props}
      {...{
        ...data,
        isGettingBalance,
      }}
    />
  );
};

enhance.propTypes = {
  tokenId: PropTypes.string.isRequired,
};

export default enhance;
