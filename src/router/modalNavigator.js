import {createStackNavigator} from 'react-navigation-stack';
import TxHistoryDetail from '@src/routes/wallet/features/txHistory';
import ROUTE_NAMES from './routeNames';

const ModalNavigator = createStackNavigator(
  {
    Home: null,
  },
  {
    headerMode: 'none',
  },
);

export default ModalNavigator;
