import React from 'react';
import {compose} from 'recompose';
import withDevices from '@src/routes/accounts/features/devices/devices.enhance';
import {useSelector} from 'react-redux';
import {devicesSelector} from '@src/routes/accounts/features/devices/devices.selector';
import LoadingContainer from '@src/components/LoadingContainer';

const enhance = WrappedComp => props => {
  const {isFetched} = useSelector(devicesSelector);
  if (!isFetched) {
    return <LoadingContainer />;
  }
  return <WrappedComp {...props} />;
};

export default compose(withDevices, enhance);
