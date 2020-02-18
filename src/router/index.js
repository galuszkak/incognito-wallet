import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import ImportAccount from '@src/routes/accounts/features/import';
import AppNavigator from './AppNavigator';
import ROUTE_NAMES from './routeNames';
import SplashNavigator from './SplashNavigator';

export default createAppContainer(
  createSwitchNavigator(
    {
      [ROUTE_NAMES.RootApp]: AppNavigator,
      [ROUTE_NAMES.RootSplash]: SplashNavigator,
      [ROUTE_NAMES.ImportAccount]: ImportAccount,
    },
    {
      initialRouteName: ROUTE_NAMES.RootSplash,
      // initialRouteName: ROUTE_NAMES.ImportAccount,
    },
  ),
);
