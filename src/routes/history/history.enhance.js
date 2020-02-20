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
import {loadHistoryByAccount} from '@src/services/wallet/WalletService';
import EmptyHistory from './history.empty';
import {
  combineHistory,
  loadTokentHistory,
  getHistoryFromApi,
  normalizeHistoriesCrypto,
} from './history.utils';

const enhance = WrappedComp => props => {
  const tokenSelected = useSelector(selectedPrivacySeleclor.selectedPrivacy);
  const wallet = useSelector(state => state.wallet);
  const account = useSelector(accountSeleclor.defaultAccount);
  const tokensFollowed = useSelector(tokenSeleclor.followed);
  const [state, setState] = React.useState({
    isFetching: true,
    isFetched: false,
    data: [],
  });
  const {isFetching, isFetched, data} = state;
  const fetchDataToken = async () => {
    try {
      const token = tokensFollowed.find(
        item => item.id === tokenSelected.tokenId,
      );
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

  const fetchDataCrypto = async () => {
    try {
      const accountName = account?.name || '';
      await setState({...state, isFetching: true});
      if (!wallet) {
        throw new Error('Wallet is not exist to load history');
      }
      if (!accountName) {
        throw new Error('Account is not exist to load history');
      }
      const histories = await loadHistoryByAccount(wallet, accountName);
      await setState({
        ...state,
        isFetched: true,
        isFetching: false,
        data: [
          ...normalizeHistoriesCrypto(
            histories,
            tokenSelected?.decimals,
            tokenSelected?.pDecimals,
          ),
        ],
      });
    } catch (error) {
      await setState({
        ...state,
        isFetched: false,
        isFetching: false,
      });
      new ExHandler(error).showErrorToast();
    }
  };
  const fetchData = () => {
    if (tokenSelected?.isToken) {
      fetchDataToken();
    }
    if (tokenSelected?.isMainCrypto) {
      fetchDataCrypto();
    }
  };
  const handleScrollReload = () => {
    fetchData();
  };

  React.useEffect(() => {
    fetchData();
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
