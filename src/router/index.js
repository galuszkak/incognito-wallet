import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import WalletDetail from '@src/routes/wallet/features/detail';
import {NavigationContainer} from '@react-navigation/native';
import Setting from '@src/routes/home/features/setting';
import AppNavigator from './AppNavigator';
import ROUTE_NAMES from './routeNames';
import SplashNavigator from './SplashNavigator';

//TODO: mockup data

export default createAppContainer(
  createSwitchNavigator(
    {
      [ROUTE_NAMES.RootApp]: AppNavigator,
      [ROUTE_NAMES.RootSplash]: SplashNavigator,
      [ROUTE_NAMES.Setting]: Setting,
    },
    {
      initialRouteName: ROUTE_NAMES.RootSplash,
      // initialRouteName: ROUTE_NAMES.Setting,
    },
  ),
);
