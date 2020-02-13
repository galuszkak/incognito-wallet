

import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {actionFetch as fetchTokenData} from './token.actions';
import {tokenStateSelector} from './token.selector';

const enhance = WrappedComp => props => {
  const {tokenId} = props;
  const dispatch = useDispatch();
  const tokenState = useSelector(tokenStateSelector);
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
