import React from 'react';
import {selectedPrivacySeleclor} from '@src/redux/selectors';
import {useSelector} from 'react-redux';
import {getTokenInfo} from '@src/services/api/token';
import {ExHandler} from '@src/services/exception';
import LoadingContainer from '@src/components/LoadingContainer';
import {compose} from 'recompose';
import {withHeader} from '@src/shared/components/header';
import {tokenFactories} from './tokenInfo.utils';
import Header from './tokenInfo.header';

const enhance = WrappedComp => props => {
  const selectedPrivacy = useSelector(selectedPrivacySeleclor.selectedPrivacy);
  const [state, setState] = React.useState({
    isFetching: true,
    isFetched: false,
    tokenInfo: {},
    data: [],
  });
  const {isFetching, isFetched, data, tokenInfo} = state;
  const fetchData = async () => {
    try {
      if (!selectedPrivacy.tokenId) {
        throw Error();
      }
      const tokenInfo = await getTokenInfo({
        tokenId: selectedPrivacy.tokenId,
      });
      await setState({
        ...state,
        isFetched: true,
        isFetching: false,
        tokenInfo: {...tokenInfo},
        data: [...tokenFactories(tokenInfo, selectedPrivacy)],
      });
    } catch (error) {
      new ExHandler(error).showErrorToast();
      await setState({...state, isFetching: false});
    }
  };
  React.useEffect(() => {
    if (selectedPrivacy.tokenId) {
      fetchData();
    }
  }, [selectedPrivacy?.tokenId || null]);
  if (!isFetched) {
    return <LoadingContainer />;
  }
  return (
    <WrappedComp
      {...{
        ...props,
        selectedPrivacy,
        data,
        tokenInfo,
        isFirstRoute: true,
        rightCol: <Header />,
      }}
    />
  );
};

export default compose(enhance, withHeader);
