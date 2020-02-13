import {
  internalTokens as internalTokensSelector,
  pTokens as pTokensSelector,
  followed as followedSelector,
} from '@src/redux/selectors/token';
import {accountSeleclor,sharedSeleclor} from '@src/redux/selectors';

import {CONSTANT_COMMONS} from '@src/constants';
import SelectedPrivacy from '@src/models/selectedPrivacy';
import {
  ACTION_FETCHING,
  ACTION_FETCHED,
  ACTION_FETCH_FAIL,
} from './token.constant';

export const actionFetching = payload => ({
  type: ACTION_FETCHING,
  payload,
});

export const actionFetched = payload => ({
  type: ACTION_FETCHED,
  payload,
});

export const actionFetchFail = payload => ({
  type: ACTION_FETCH_FAIL,
  payload,
});

export const actionFetch = tokenId => async (dispatch, getState) => {
  try {
    await dispatch(
      actionFetching({
        tokenId,
      }),
    );
    const state = getState();
    const account = accountSeleclor.defaultAccount(state);
    const internalTokens = internalTokensSelector(state);
    const pTokens = pTokensSelector(state);
    const followed = followedSelector(state);
    const isGettingBalance = sharedSeleclor
      .isGettingBalance(state)
      .includes(tokenId);
    const internalTokenData =
      internalTokens?.find(
        t => t?.id !== CONSTANT_COMMONS.PRV_TOKEN_ID && t?.id === tokenId,
      ) || {};
    const pTokenData = pTokens?.find(t => t?.tokenId === tokenId);
    const followedTokenData = followed.find(t => t?.id === tokenId) || {};
    if (
      !internalTokenData &&
      !pTokenData &&
      tokenId !== CONSTANT_COMMONS.PRV_TOKEN_ID
    ) {
      throw new Error(`Can not find coin with id ${tokenId}`);
    }
    const data = new SelectedPrivacy(
      account,
      {...internalTokenData, ...followedTokenData},
      pTokenData,
    );
    await dispatch(actionFetched({...data, isGettingBalance}));
  } catch (error) {
    console.log('error', error);
    await dispatch(actionFetchFail());
  }
};
