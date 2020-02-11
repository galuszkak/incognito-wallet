import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {selectedPrivacySeleclor, sharedSeleclor} from '@src/redux/selectors';

const enhance = WrappedComp => props => {
  const {tokenId} = props;
  const data = useSelector(state =>
    selectedPrivacySeleclor.getPrivacyDataByTokenID(state)(tokenId),
  );
  const isGettingBalance = useSelector(
    sharedSeleclor.isGettingBalance,
  ).includes(tokenId);

  if (!data) {
    return null;
  }

  return (
    <WrappedComp
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
