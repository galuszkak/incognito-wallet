import { THEME } from '@src/styles';
import { createStackNavigator } from 'react-navigation-stack';
import CreateAccount from '@src/screens/CreateAccount';
import ExportAccount from '@src/screens/ExportAccount';
import FollowToken from '@src/screens/FollowToken';
import CreateToken from '@src/screens/CreateToken';
import AddToken from '@src/screens/AddToken';
import ImportAccount from '@src/screens/ImportAccount';
import NetworkSetting from '@src/screens/NetworkSetting';
import WalletDetail from '@src/screens/WalletDetail';
import ReceiveCrypto from '@src/screens/ReceiveCrypto';
import SendCrypto from '@src/screens/SendCrypto';
import Deposit from '@src/screens/Deposit';
import Withdraw from '@src/screens/Withdraw';
import TxHistoryDetail from '@src/screens/TxHistoryDetail';
import Setting from '@screens/Setting';
import DexHistory from '@screens/DexHistory';
import DexHistoryDetail from '@screens/DexHistoryDetail';
import HeaderBar from '@src/components/HeaderBar';
import pApp from '@src/screens/PappView';
import AddPIN from '@src/screens/AddPIN';
import BackupKeys from '@src/screens/BackupKeys';
import { navigationOptionsHandler } from '@src/utils/router';
import ROUTE_NAMES from './routeNames';
import TabNavigator from './TabNavigator';

const AppNavigator = createStackNavigator(
  {
    [ROUTE_NAMES.RootTab]: TabNavigator,
    [ROUTE_NAMES.NetworkSetting]: navigationOptionsHandler(NetworkSetting, { title: 'Network' }),
    [ROUTE_NAMES.CreateAccount]: navigationOptionsHandler(CreateAccount, { title: 'Create Account' }),
    [ROUTE_NAMES.ImportAccount]: navigationOptionsHandler(ImportAccount, { title: 'Import Account' }),
    [ROUTE_NAMES.ExportAccount]: navigationOptionsHandler(ExportAccount),
    [ROUTE_NAMES.FollowToken]: navigationOptionsHandler(FollowToken, { header: () => null }),
    [ROUTE_NAMES.CreateToken]: navigationOptionsHandler(CreateToken, { title: 'Issue a privacy coin' }),
    [ROUTE_NAMES.AddToken]: navigationOptionsHandler(AddToken, { title: 'Add manually' }),
    [ROUTE_NAMES.WalletDetail]: navigationOptionsHandler(WalletDetail),
    [ROUTE_NAMES.ReceiveCrypto]: navigationOptionsHandler(ReceiveCrypto, { title: 'Receive' }),
    [ROUTE_NAMES.SendCrypto]: navigationOptionsHandler(SendCrypto, { title: 'Send' }),
    [ROUTE_NAMES.Deposit]: navigationOptionsHandler(Deposit),
    [ROUTE_NAMES.Withdraw]: navigationOptionsHandler(Withdraw),
    [ROUTE_NAMES.TxHistoryDetail]: navigationOptionsHandler(TxHistoryDetail, { title: 'History Detail' }),
    [ROUTE_NAMES.Setting]: navigationOptionsHandler(Setting, { title: 'You' }),
    [ROUTE_NAMES.DexHistory]: navigationOptionsHandler(DexHistory, { header: () => null }),
    [ROUTE_NAMES.DexHistoryDetail]: navigationOptionsHandler(DexHistoryDetail, { header: () => null }),
    [ROUTE_NAMES.pApp]: navigationOptionsHandler(pApp),
    [ROUTE_NAMES.AddPin]: navigationOptionsHandler(AddPIN, { header: () => null }),
    [ROUTE_NAMES.BackupKeys]: navigationOptionsHandler(BackupKeys, { title: 'Back up private keys' }),
  },
  {
    initialRouteName: ROUTE_NAMES.RootTab,
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      // You can do whatever you like here to pick the title based on the route name
      const title = routeName;
      return {
        title,
        header: HeaderBar,
        headerBackground: THEME.header.backgroundColor,
        gesturesEnabled: false,
      };
    }
  }
);

export default AppNavigator;
