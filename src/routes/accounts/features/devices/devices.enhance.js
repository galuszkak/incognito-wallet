import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {devicesSelector} from './devices.selector';
import {actionFetch} from './devices.actions';

const enhance = WrappedComp => props => {
  const {isFetched} = useSelector(devicesSelector);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!isFetched) {
      dispatch(actionFetch());
    }
  }, []);
  return <WrappedComp {...props} />;
};

export default enhance;
