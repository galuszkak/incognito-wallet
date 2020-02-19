import {differenceBy} from 'lodash';
import type from '@src/redux/types/account';
import TokenModel from '@src/models/token';
import walletType from '@src/redux/types/wallet';
import {getPassphrase} from '@src/services/wallet/passwordService';
import {getUserUnfollowTokenIDs} from '@src/services/wallet/tokenService';
import accountService from '@src/services/wallet/accountService';
import {walletSelector} from '@src/routes/wallet/wallet.selector';
import {Toast} from '@src/components/core';
import AccountModel from '@src/models/account';
import {ErrorCode, ExHandler} from '@src/services/exception';
import {loadListAccount} from '@src/services/wallet/WalletService';
import {tokenSeleclor, accountSeleclor} from '@src/redux/selectors';
import {
  getBalance as getTokenBalance,
  setListToken,
} from '@src/redux/actions/token';

/**
 *  return basic account object from its name like its KEY, not including account methods (please use accountWallet instead)
 *
 * @param {object} state redux state
 * @param {string} accountName name of account you wanna get
 */
const getBasicAccountObjectByName = state => accountName => {
  return accountSeleclor.getAccountByName(state)(accountName);
};

export const setAccount = (
  account = new Error('Account object is required'),
) => ({
  type: type.SET,
  data: account,
});

export const setListAccount = (accounts = []) => {
  if (accounts && accounts.constructor !== Array) {
    throw new TypeError('Accounts must be an array');
  }
  return {
    type: type.SET_LIST,
    data: accounts,
  };
};

export const removeAccount = (
  account = new Error('Account is required'),
) => async (dispatch, getState) => {
  try {
    const wallet = getState()?.wallet;

    if (!wallet) {
      throw new Error(
        'Wallet is not existed, can not remove account right now',
      );
    }

    const {PrivateKey, name} = account;
    const passphrase = await getPassphrase();
    await accountService.removeAccount(PrivateKey, passphrase, wallet);

    dispatch({
      type: type.REMOVE_BY_NAME,
      data: name,
    });

    return true;
  } catch (e) {
    throw e;
  }
};

export const getBalanceStart = accountName => ({
  type: type.GET_BALANCE,
  data: accountName,
});

export const getBalanceFinish = accountName => ({
  type: type.GET_BALANCE_FINISH,
  data: accountName,
});

export const setDefaultAccount = account => {
  accountService.saveDefaultAccountToStorage(account?.name);
  return {
    type: type.SET_DEFAULT_ACCOUNT,
    data: account,
  };
};

export const getBalance = account => async (dispatch, getState) => {
  let balance = 0;
  try {
    if (!account) throw new Error('Account object is required');

    dispatch(getBalanceStart(account?.name));

    const wallet = getState()?.wallet;

    if (!wallet) {
      throw new Error('Wallet is not exist');
    }

    balance = await accountService.getBalance(account, wallet);
    const accountMerge = {
      ...account,
      value: balance,
    };
    // console.log(TAG,'getBalance = accountMerge = ',accountMerge);
    dispatch(setAccount(accountMerge));
  } catch (e) {
    account &&
      dispatch(
        setAccount({
          ...account,
          value: null,
        }),
      );
    throw e;
  } finally {
    dispatch(getBalanceFinish(account?.name));
  }

  return balance ?? 0;
};

export const loadAllPTokenHasBalance = account => async (
  dispatch,
  getState,
) => {
  if (!account) {
    throw new Error('Account is required');
  }

  const state = getState();
  const wallet = state?.wallet;

  if (!wallet) {
    throw new Error('Wallet is not existed');
  }

  const allTokenData = await accountService.getListTokenHasBalance(
    account,
    wallet,
  );
  const followedToken = tokenSeleclor.followed(state);
  const allIncognitoTokens = tokenSeleclor.internalTokens(state);

  // get data of tokens that have balance
  const allTokens = allTokenData?.map(tokenData =>
    allIncognitoTokens?.find(t => t?.id === tokenData?.id),
  );

  const newTokens = differenceBy(allTokens, followedToken, 'id');

  // if token id has been existed in USER UNFOLLOWING LIST, ignore it!
  const userUnfollowedList = await getUserUnfollowTokenIDs();
  const shouldAddTokens = newTokens?.filter(
    token => !userUnfollowedList?.includes(token.id),
  );

  if (shouldAddTokens?.length > 0) {
    await accountService.addFollowingTokens(
      shouldAddTokens.map(TokenModel.toJson),
      account,
      wallet,
    );

    // update wallet object to store
    dispatch({
      type: walletType.SET,
      data: wallet,
    });
  }

  return allTokens;
};

export const reloadAccountFollowingToken = (
  account = new Error('Account object is required'),
  {shouldLoadBalance = true} = {},
) => async (dispatch, getState) => {
  try {
    const wallet = getState()?.wallet;

    if (!wallet) {
      throw new Error('Wallet is not exist');
    }

    const tokens = accountService.getFollowingTokens(account, wallet);

    shouldLoadBalance &&
      tokens.forEach(token => getTokenBalance(token)(dispatch, getState));

    dispatch(setListToken(tokens));

    return tokens;
  } catch (e) {
    throw e;
  }
};

export const followDefaultTokens = (
  account = new Error('Account object is required'),
  pTokenList,
) => async (dispatch, getState) => {
  try {
    const state = getState();
    const wallet = state?.wallet;
    const pTokens = pTokenList || tokenSeleclor.pTokens(state);

    if (!wallet) {
      throw new Error('Wallet is not exist');
    }

    const defaultTokens = [];
    pTokens?.forEach(token => {
      if (token.default) {
        defaultTokens.push(token.convertToToken());
      }
    });

    if (defaultTokens?.length > 0) {
      await accountService.addFollowingTokens(defaultTokens, account, wallet);
    }

    // update wallet object to store
    dispatch({
      type: walletType.SET,
      data: wallet,
    });

    return defaultTokens;
  } catch (e) {
    throw e;
  }
};

export const switchAccount = accountName => async (dispatch, getState) => {
  try {
    if (!accountName) throw new Error('accountName is required');

    const state = getState();
    const wallet = state?.wallet;

    if (!wallet) {
      throw new Error('Wallet is not exist');
    }

    const account = getBasicAccountObjectByName(state)(accountName);
    const defaultAccount = accountSeleclor.defaultAccount(state);

    if (defaultAccount?.name === account?.name) {
      return;
    }

    dispatch(setDefaultAccount(account));
    await getBalance(account)(dispatch, getState).catch(() => null);
    await reloadAccountFollowingToken(account)(dispatch, getState).catch(
      () => null,
    );

    return accountSeleclor.defaultAccount(state);
  } catch (e) {
    throw e;
  }
};

export const actionImportFetching = () => ({
  type: type.ACTION_IMPORT_ACCOUNT_FETCHING,
});

export const actionImportFetched = () => ({
  type: type.ACTION_IMPORT_ACCOUNT_FETCHED,
});

export const actionImportError = () => ({
  type: type.ACTION_IMPORT_ACCOUNT_ERROR,
});

export const actionImportAccount = ({
  privateKey,
  accountName,
  navigation,
}) => async (dispatch, getState) => {
  try {
    await dispatch(actionImportFetching());
    const state = getState();
    const wallet = walletSelector(state);
    if (!wallet) {
      throw new Error('Wallet is not exist');
    }
    const passphrase = await getPassphrase();
    const isImported = await accountService.importAccount(
      privateKey,
      accountName,
      passphrase,
      wallet,
    );
    if (!isImported) throw new Error(ErrorCode.importAccount_failed);
    const listAccount = await loadListAccount(wallet);
    await dispatch(setListAccount(listAccount));
    const account = listAccount.find(item => item.name === accountName);
    await dispatch(switchAccount(accountName));
    await dispatch(followDefaultTokens(account));
    await dispatch(actionImportFetched());
    Toast.showSuccess('Import successful!');
    navigation.goBack();
  } catch (error) {
    await dispatch(actionImportError());
    new ExHandler(
      error,
      'Import account failed, please try again',
    ).showErrorToast();
  }
};

export const actionCreateFetching = () => ({
  type: type.ACTION_CREATE_ACCOUNT_FETCHING,
});

export const actionCreateFetched = () => ({
  type: type.ACTION_CREATE_ACCOUNT_FETCHED,
});

export const actionCreateError = () => ({
  type: type.ACTION_CREATE_ACCOUNT_ERROR,
});

export const actionCreateAccount = ({accountName, navigation}) => async (
  dispatch,
  getState,
) => {
  try {
    await dispatch(actionCreateFetching());
    const state = getState();
    const wallet = walletSelector(state);
    if (!accountName) {
      throw new Error('Account name is required!');
    }
    if (!wallet) {
      throw new Error('Wallet is not exist!');
    }
    const account = await accountService.createAccount(accountName, wallet);
    if (!account) {
      throw new Error(ErrorCode.createAccount_failed);
    }
    const listAccount = await loadListAccount(wallet);
    dispatch(setListAccount(listAccount));
    const serializedAccount = new AccountModel(
      accountService.toSerializedAccountObj(account),
    );
    await dispatch(switchAccount(accountName));
    await dispatch(followDefaultTokens(serializedAccount));
    await dispatch(actionCreateFetched());
    Toast.showInfo('Success! Account created.');
    navigation.goBack();
  } catch (error) {
    await dispatch(actionCreateError());
    new ExHandler(
      error,
      'Account was not created! Please try again.',
    ).showErrorToast();
  }
};
