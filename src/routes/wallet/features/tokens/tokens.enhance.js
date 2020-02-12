import React from 'react';
import {getInternalTokenList, getPTokenList} from '@src/redux/actions/token';
import {
  getBalance as getAccountBalance,
  reloadAccountFollowingToken,
} from '@src/redux/actions/account';
import storageService from '@src/services/storage';
import {CONSTANT_KEYS} from '@src/constants';
import {countFollowToken} from '@src/services/api/token';
import {useDispatch, useSelector} from 'react-redux';
import LoadingContainer from '@src/components/LoadingContainer';
import {CustomError, ErrorCode, ExHandler} from '@src/services/exception';
import {useNavigation} from 'react-navigation-hooks';
import {clearSelectedPrivacy} from '@src/redux/actions/selectedPrivacy';
import {defaultAccount} from '@src/redux/selectors/account';
import {tokenSeleclor} from '@src/redux/selectors';
import AppUpdater from '@src/components/AppUpdater';
import {AppState} from 'react-native';
import routeNames from '@src/router/routeNames';

const enhance = WrappedComp => props => {
  const dispatch = useDispatch();
  const tokens = useSelector(tokenSeleclor.followed);
  const account = useSelector(defaultAccount);
  const wallet = useSelector(state => state.wallet);
  const navigation = useNavigation();
  const pin = useSelector(state => state.pin.pin);
  const [state, setState] = React.useState({
    isReloading: false,
    isReceivedPRV: false,
    appState: '',
  });
  const {isReloading, isReceivedPRV, appState} = state;
  const handleGetTokens = async () => {
    try {
      await dispatch(getPTokenList());
      await dispatch(getInternalTokenList());
    } catch (e) {
      new ExHandler(
        e,
        'Sorry, we can not get list of tokens, reopen the app can fix it.',
      );
    }
  };
  const handleGetAccountBalance = async () => {
    try {
      return dispatch(getAccountBalance(account));
    } catch (e) {
      throw new CustomError(ErrorCode.home_load_balance_failed, {rawError: e});
    }
  };
  const handleGetFollowingToken = async ({shouldLoadBalance = false} = {}) => {
    try {
      const result = await dispatch(
        reloadAccountFollowingToken(account, {
          shouldLoadBalance,
        }),
      );
      return result;
    } catch (e) {
      throw new CustomError(ErrorCode.home_load_following_token_failed, {
        rawError: e,
      });
    }
  };
  const handleCountFollowedToken = async () => {
    try {
      const isChecked = !!JSON.parse(
        await storageService.getItem(CONSTANT_KEYS.IS_CHECK_FOLLOWED_TOKEN),
      );
      const tokenIds = tokens.map(t => t.id);
      if (!isChecked) {
        countFollowToken(tokenIds, account?.PublicKey).catch(null);
        storageService.setItem(
          CONSTANT_KEYS.IS_CHECK_FOLLOWED_TOKEN,
          JSON.stringify(true),
        );
      }
    } catch (e) {
      new ExHandler(e);
    }
  };

  const handleLogin = nextAppState => {
    if (appState.match(/background/) && nextAppState === 'active') {
      AppUpdater.update();
      if (pin) {
        navigation.navigate(routeNames.AddPin, {action: 'login'});
      }
    }
    setState({appState: nextAppState});
  };

  const handleClearSelectedPrivacy = async () => {
    dispatch(clearSelectedPrivacy());
  };

  const reload = async () => {
    try {
      setState({isReloading: true});
      const tasks = [
        handleGetTokens(),
        handleGetAccountBalance(),
        handleGetFollowingToken({shouldLoadBalance: true}),
      ];
      await Promise.all(tasks);
    } catch (e) {
      new ExHandler(e).showErrorToast();
    } finally {
      setState({isReloading: false});
    }
  };

  const fetchData = async () => {
    try {
      await reload();
      handleCountFollowedToken();
    } catch (e) {
      new ExHandler(e).showErrorToast();
    }
    AppState.addEventListener('change', handleLogin);
    navigation.addListener('didFocus', handleClearSelectedPrivacy);
    return () => {
      AppState.removeEventListener('change', handleLogin);
      navigation.removeListener('didFocus', handleClearSelectedPrivacy);
    };
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    handleGetFollowingToken();
  }, [wallet]);

  if (!wallet) return <LoadingContainer />;

  return <WrappedComp {...{...props, isReloading, reload}} />;
};

export default enhance;
