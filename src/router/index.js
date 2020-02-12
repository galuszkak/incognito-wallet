import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import WalletDetail from '@src/routes/wallet/features/detail';
import AppNavigator from './AppNavigator';
import ROUTE_NAMES from './routeNames';
import SplashNavigator from './SplashNavigator';

//TODO: mockup data

export default createAppContainer(
  createSwitchNavigator(
    {
      [ROUTE_NAMES.RootApp]: AppNavigator,
      [ROUTE_NAMES.RootSplash]: SplashNavigator,
      [ROUTE_NAMES.WalletDetail]: WalletDetail,
    },
    {
      // initialRouteName: ROUTE_NAMES.RootSplash,
      initialRouteName: ROUTE_NAMES.WalletDetail,
    },
  ),
);
