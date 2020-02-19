import {createSelector} from 'reselect';

export const devicesSelector = createSelector(
  state => state.devices,
  devices => devices,
);
