import {createSelector} from 'reselect';
import {accountSeleclor} from '@src/redux/selectors';
import randomName from '@src/utils/randomName';

export const randomAccountNameSelector = createSelector(
  accountSeleclor.nameAccountList,
  accountList => randomName({excludes: accountList}),
);
