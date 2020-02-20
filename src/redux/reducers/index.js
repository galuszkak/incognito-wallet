import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';
import {reducer as formReducer} from 'redux-form';
import modal from '@src/shared/components/modal/modal.reducer';
import devices from '@src/routes/accounts/features/devices/devices.reducer';
import wallet from './wallet';
import account from './account';
import server from './server';
import token from './token';
import selectedPrivacy from './selectedPrivacy';
import app from './app';
import dex from './dex';
import pin from './pin';
import globalReducer from './globalReducer';

const rootReducer = reduceReducers(
  combineReducers({
    account,
    wallet,
    server,
    token,
    selectedPrivacy,
    app,
    dex,
    pin,
    form: formReducer,
    modal,
    devices,
  }),
  globalReducer,
);

export default rootReducer;
