import LocalDatabase from '@src/utils/LocalDatabase';
import Device from '@src/models/device';
import {
  ACTION_FETCHING,
  ACTION_FETCHED,
  ACTION_FETCH_FAIL,
} from './devices.constant';

export const actionFetching = () => ({
  type: ACTION_FETCHING,
});

export const actionFetched = payload => ({
  type: ACTION_FETCHED,
  payload,
});

export const actionFetchFail = () => ({
  type: ACTION_FETCH_FAIL,
});

export const actionFetch = () => async dispatch => {
  try {
    await dispatch(actionFetching());
    const data = await LocalDatabase.getListDevices();
    const devices = data.map(device => Device.getInstance(device));
    await dispatch(actionFetched(devices));
  } catch (error) {
    await dispatch(actionFetchFail());
  }
};
