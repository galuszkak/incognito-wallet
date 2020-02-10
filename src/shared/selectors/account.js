import {createSelector} from 'reselect';

export const defaultAccountSelector = createSelector(
  state => state.account,
  account => account.defaultAccountName,
);
