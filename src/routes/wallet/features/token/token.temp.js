import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {actionFetch as fetchTokenData} from './token.actions';
// import {useSelector} from 'react-redux';
// import {selectedPrivacySeleclor, sharedSeleclor} from '@src/redux/selectors';
import {tokenStateSelector} from './token.selector';

const enhance = WrappedComp => props => {
  const {tokenId} = props;
  const dispatch = useDispatch();
  const tokenState = useSelector(tokenStateSelector);
  // const data = useSelector(state =>
  //   selectedPrivacySeleclor.getPrivacyDataByTokenID(state)(tokenId),
  // );
  // const isGettingBalance = useSelector(
  //   sharedSeleclor.isGettingBalance,
  // ).includes(tokenId);

  const fetchData = () => {
    dispatch(fetchTokenData(tokenId));
  };

  React.useEffect(() => {
    fetchData();
  }, [tokenId]);

  if (!tokenState[tokenId]) {
    return null;
  }
  return <WrappedComp {...props} />;
};

enhance.propTypes = {
  tokenId: PropTypes.string.isRequired,
};

export default enhance;
