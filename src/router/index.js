import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Setting from '@src/routes/home/features/setting';
import CreateAccount from '@src/routes/accounts/features/create';
import AppNavigator from './AppNavigator';
import ROUTE_NAMES from './routeNames';
import SplashNavigator from './SplashNavigator';

export default createAppContainer(
  createSwitchNavigator(
    {
      [ROUTE_NAMES.RootApp]: AppNavigator,
      [ROUTE_NAMES.RootSplash]: SplashNavigator,
      [ROUTE_NAMES.CreateAccount]: CreateAccount,
    },
    {
      initialRouteName: ROUTE_NAMES.RootSplash,
      // initialRouteName: ROUTE_NAMES.Setting,
      // initialRouteName: ROUTE_NAMES.CreateAccount,
    },
  ),
);
