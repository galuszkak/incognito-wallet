import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Text} from 'react-native';
import {settingSelector} from './setting.selector';
import {actionFetch as fetchData} from './setting.actions';

const enhance = WrappedComp => props => {
  const {isFetching, isFetched, data} = useSelector(settingSelector);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!isFetched) {
      dispatch(fetchData());
    }
  }, []);
  if (!isFetched) {
    return <Text>Fetching data...</Text>;
  }
  return <WrappedComp {...props} />;
};

export default enhance;
