import {selectedPrivacySeleclor, sharedSeleclor} from '@src/redux/selectors';
import {
  ACTION_FETCHING,
  ACTION_FETCHED,
  ACTION_FETCH_FAIL,
} from './token.constant';

export const actionFetching = (payload) => ({
  type: ACTION_FETCHING,
  payload
});

export const actionFetched = payload => ({
  type: ACTION_FETCHED,
  payload,
});

export const actionFetchFail = (payload) => ({
  type: ACTION_FETCH_FAIL,
  payload
});

export const actionFetch = (tokenId) => async (dispatch, getState) => {
  try {
    await dispatch(actionFetching({
      tokenId
    }));
    const state = getState();
    const privacyData = await selectedPrivacySeleclor.getPrivacyDataByTokenID(state)(
      tokenId,
    );
    const isGettingBalance = await sharedSeleclor
      .isGettingBalance(state)
      .includes(tokenId);
    const data = {
      ...privacyData,
      isGettingBalance,
    };
    await dispatch(actionFetched(data));
  } catch (error) {
    console.log('error', error);
    await dispatch(actionFetchFail());
  }
};
