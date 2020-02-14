import React from 'react';
import {useSelector} from 'react-redux';
import serverService from '@src/services/wallet/Server';

const enhance = WrappedComp => props => {
  const defaultServer = useSelector(
    state =>
      state.server.defaultServer || {
        id: null,
      },
  );
  const [state, setState] = React.useState({
    server: {
      name: '',
      address: '',
    },
    isFetched: false,
    isFetching: true,
  });
  const fetchData = async () => {
    try {
      const serverData = await serverService.getDefault();
      await setState({
        ...state,
        server: {...serverData},
        isFetched: true,
        isFetching: false,
      });
    } catch (error) {
      await setState({...state, isFetching: false, isFetched: false});
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [defaultServer.id]);
  return <WrappedComp {...props} data={state.server} />;
};

export default enhance;
