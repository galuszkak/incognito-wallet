import React from 'react';
import LocalDatabase from '@src/utils/LocalDatabase';
import Device from '@src/models/device';
import LoadingContainer from '@src/components/LoadingContainer';

const enhance = WrappedComp => props => {
  const [state, setState] = React.useState({
    devices: [],
    isFetching: true,
    isFetched: false,
  });
  const {isFetched} = state;
  const fetchData = async () => {
    try {
      const devicesDt = await LocalDatabase.getListDevices();
      await setState({
        ...state,
        devices: [...devicesDt.map(device => Device.getInstance(device))],
        isFetched: true,
        isFetching: false,
      });
    } catch (error) {
      await setState({
        ...state,
        isFetching: false,
        isFetched: false,
      });
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  if (!isFetched) {
    return <LoadingContainer />;
  }
  return <WrappedComp props={props} data={state} />;
};

export default enhance;
