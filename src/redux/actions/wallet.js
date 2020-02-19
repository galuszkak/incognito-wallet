import {loadListAccount, loadWallet} from '@src/services/wallet/WalletService';
import accountService from '@src/services/wallet/accountService';
import {getPassphrase} from '@src/services/wallet/passwordService';
import type from '@src/redux/types/wallet';
import {setListAccount, setDefaultAccount} from '@src/redux/actions/account';
import {accountSeleclor} from '@src/redux/selectors';

const getStoredDefaultAccountName = async listAccount => {
  const firstAccountName = listAccount && listAccount[0]?.name;
  try {
    const storedName = await accountService.getDefaultAccountName();
    if (storedName) {
      return storedName;
    }
    throw new Error(
      'Can not find stored account name, will fallback to first account',
    );
  } catch {
    return firstAccountName;
  }
};

export const setWallet = (wallet = null) => ({
  type: type.SET,
  data: wallet,
});

export const removeWallet = () => ({
  type: type.REMOVE,
});

export const reloadAccountList = () => async (dispatch, getState) => {
  try {
    const wallet = getState()?.wallet;
    if (!wallet) {
      throw new Error('Wallet null');
    }
    const accounts = await loadListAccount(wallet);
    await dispatch(setListAccount(accounts));
  } catch (error) {
    throw error;
  }
};

export const reloadWallet = passphrase => async (dispatch, getState) => {
  try {
    let defaultAccount = accountSeleclor.defaultAccount(getState());
    const _passphrase = passphrase || (await getPassphrase());
    if (!_passphrase) {
      return;
    }

    const wallet = await loadWallet(_passphrase);

    if (wallet) {
      dispatch(setWallet(wallet));

      const accounts = await loadListAccount(wallet);
      dispatch(setListAccount(accounts));

      if (!defaultAccount) {
        const defaultAccountName = await getStoredDefaultAccountName(accounts);
        defaultAccount = accounts?.find(a => a?.name === defaultAccountName);
        defaultAccount && dispatch(setDefaultAccount(defaultAccount));
      }

      return wallet;
    }
    return false;
  } catch (e) {
    throw e;
  }
};
