import React from 'react';
import {selectedPrivacySeleclor, sharedSeleclor} from '@src/redux/selectors';
import {useSelector} from 'react-redux';
import LoadingContainer from '@src/components/LoadingContainer';

const enhance = WrappedComp => props => {
  const selectedPrivacy = useSelector(state =>
    selectedPrivacySeleclor.selectedPrivacy(state),
  );
  const isGettingBalance = useSelector(state =>
    sharedSeleclor.isGettingBalance(state),
  ).includes(selectedPrivacy.tokenId);

  if (!selectedPrivacy) {
    return <LoadingContainer />;
  }
  return (
    <WrappedComp
      props={props}
      {...{
        ...selectedPrivacy,
        isGettingBalance,
      }}
    />
  );
};

export default enhance;
