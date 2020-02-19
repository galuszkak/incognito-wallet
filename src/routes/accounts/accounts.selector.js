import {createSelector} from 'reselect';
import {accountSeleclor} from '@src/redux/selectors';
import randomName from '@src/utils/randomName';

export const randomAccountNameSelector = createSelector(
  accountSeleclor.nameAccountList,
  accountList => randomName({excludes: accountList}),
);

export const importAccountSelector = createSelector(
  state => state.account.import,
  importAccount => importAccount,
);

export const createAccountSelector = createSelector(
  state => state.account.create,
  create => create,
);
