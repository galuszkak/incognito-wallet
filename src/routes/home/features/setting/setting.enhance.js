import React from 'react';
import LocalDatabase from '@src/utils/LocalDatabase';
import Device from '@src/models/device';
import LoadingContainer from '@src/components/LoadingContainer';
import {compose} from 'recompose';
import {withHeader} from '@src/shared/components/header';
import {Button} from '@src/shared/components/button';
import {useNavigation} from 'react-navigation-hooks';
import routeNames from '@src/router/routeNames';
import {styled} from './setting.styled';

const enhance = WrappedComp => props => {
  const navigation = useNavigation();
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
  return (
    <WrappedComp
      props={props}
      data={state}
      headerTitle="YOU"
      rightCol={(
        <Button
          title="Backup"
          onPress={() => navigation.navigate(routeNames.BackupKeys)}
          style={styled.btnBackup}
        />
      )}
    />
  );
};

export default compose(enhance, withHeader);
