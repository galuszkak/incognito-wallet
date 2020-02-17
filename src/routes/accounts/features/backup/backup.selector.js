import {createSelector} from 'reselect';
import {accountSeleclor} from '@src/redux/selectors';

export const allPrivateKeysSelector = createSelector(
  accountSeleclor.listAccount,
  list => list.map(item => `${item.name}: ${item.PrivateKey}\n`).join('\n'),
);
