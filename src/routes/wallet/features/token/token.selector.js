import {createSelector} from 'reselect';

export const tokenStateSelector = createSelector(
  state => state.tokenState,
  token => token,
);
