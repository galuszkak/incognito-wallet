import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import CreateAccount from '@src/routes/accounts/features/create';
import BackupKeys from '@src/routes/accounts/features/backup';
import AppNavigator from './AppNavigator';
import ROUTE_NAMES from './routeNames';
import SplashNavigator from './SplashNavigator';

export default createAppContainer(
  createSwitchNavigator(
    {
      [ROUTE_NAMES.RootApp]: AppNavigator,
      [ROUTE_NAMES.RootSplash]: SplashNavigator,
      [ROUTE_NAMES.BackupKeys]: BackupKeys,
    },
    {
      initialRouteName: ROUTE_NAMES.RootSplash,
      // initialRouteName: ROUTE_NAMES.BackupKeys,
    },
  ),
);
