import React from 'react';
import {useSelector} from 'react-redux';
import {
  accountSeleclor,
  selectedPrivacySeleclor,
  tokenSeleclor,
} from '@src/redux/selectors';
import LoadingContainer from '@src/components/LoadingContainer';
import {ExHandler} from '@src/services/exception';
import {ScrollView, RefreshControl} from 'react-native';
import EmptyHistory from './history.empty';
import {
  combineHistory,
  loadTokentHistory,
  getHistoryFromApi,
} from './history.utils';

const enhance = WrappedComp => props => {
  const tokenSelected = useSelector(state =>
    selectedPrivacySeleclor.selectedPrivacy(state),
  );
  const wallet = useSelector(state => state.wallet);
  const account = useSelector(state => accountSeleclor.defaultAccount(state));
  const tokensFollowed = useSelector(state => tokenSeleclor.followed(state));
  const [state, setState] = React.useState({
    isFetching: true,
    isFetched: false,
    data: [],
  });
  const {isFetching, isFetched, data} = state;
  const token = tokensFollowed.find(item => item.id === tokenSelected.tokenId);
  const fetchData = async () => {
    try {
      const [historiesData, historiesFromApiData] = await Promise.all([
        loadTokentHistory(wallet, account, token),
        getHistoryFromApi(tokenSelected),
      ]);
      await setState({
        ...state,
        isFetched: true,
        isFetching: true,
        data: [
          ...combineHistory({
            historiesData,
            historiesFromApiData,
            ...tokenSelected,
          }),
        ],
      });
    } catch (e) {
      await setState({
        ...state,
        isFetched: false,
        isFetching: false,
      });
      new ExHandler(e).showErrorToast();
    }
  };

  const handleScrollReload = () => {
    fetchData();
  };

  React.useEffect(() => {
    if (tokenSelected) {
      fetchData();
    }
  }, [tokenSelected?.tokenId]);
  if (!isFetched) {
    return <LoadingContainer />;
  }
  if (data.length === 0) {
    return <EmptyHistory />;
  }
  return (
    <ScrollView
      refreshControl={(
        <RefreshControl
          refreshing={isFetching}
          onRefresh={handleScrollReload}
        />
      )}
    >
      <WrappedComp props={props} data={data} />
    </ScrollView>
  );
};

export default enhance;
