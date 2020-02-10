import LocalDatabase from '@src/utils/LocalDatabase';
import Device from '@src/models/device';
import {
  ACTION_FETCHING,
  ACTION_FETCHED,
  ACTION_FETCH_FAIL,
} from './setting.constant';
import {getDevices} from './setting.services';

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

export const actionFetch = () => async (dispatch, getState) => {
  try {
    // await dispatch(actionFetching());
    const data = await getDevices();
    const devices = (await LocalDatabase.getListDevices()).map(device =>
      Device.getInstance(device),
    );
    console.log('devices', devices);
    console.log('data', data);
    await dispatch(actionFetched(data));
  } catch (error) {
    console.log('err', error);
    await dispatch(actionFetchFail());
  }
};
