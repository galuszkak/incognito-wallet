import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@components/core';
import {getActiveChildNavigationOptions} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {navigationOptionsHandler} from '@src/utils/router';
import Home from '@src/routes/home';
import {COLORS, FONT} from '@src/styles';
import TabBarIcon from '@src/components/TabBarIcon';
import HeaderBar from '@src/components/HeaderBar';
import Dex from '@src/screens/Dex';
import {FontStyle} from '@src/styles/TextStyle';
import ROUTE_NAMES from '@src/router/routeNames';
import MinerNavigator from '@src/router/MinerNavigator';

// import Wallet from '@src/screens/Wallet';
import Wallet from '@src/routes/wallet';

//assets
import srcHomeActive from '@src/assets/images/rootTabs/ac_home.png';
import srcHome from '@src/assets/images/rootTabs/home.png';
import srcNodesActive from '@src/assets/images/rootTabs/ac_nodes.png';
import srcNodes from '@src/assets/images/rootTabs/nodes.png';
import srcWalletActive from '@src/assets/images/rootTabs/ac_wallet.png';
import srcWallet from '@src/assets/images/rootTabs/wallet.png';
import srcComActive from '@src/assets/images/rootTabs/ac_com.png';
import srcCom from '@src/assets/images/rootTabs/com.png';

const TabIcon = (type, title, {focused}) => {
  let active = null;
  let inactive = null;
  switch (type) {
    case 'wallet': {
      active = srcWalletActive;
      inactive = srcWallet;
      break;
    }
    case 'nodes': {
      active = srcNodesActive;
      inactive = srcNodes;
      break;
    }
    case 'community': {
      active = srcComActive;
      inactive = srcCom;
      break;
    }
    case 'home': {
      active = srcHomeActive;
      inactive = srcHome;
      break;
    }
    default:
      break;
  }
  return (
    <View style={styles.tabBarLabel}>
      <TabBarIcon image={focused ? active : inactive} />
      <Text style={[styles.labelStyle, focused ? styles.activeLabel : {}]}>
        {title.toUpperCase()}
      </Text>
    </View>
  );
};
const renderTab = (type, title) => TabIcon.bind(null, type, title);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 100,
    bottom: 0,
    height: '10%',
    minHeight: 90,
    backgroundColor: '#fff',
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 2,
  },
  activeLabel: {
    color: COLORS.dark1,
    ...FontStyle.bold,
  },
  tabBarLabel: {
    flexDirection: 'column',
    flex: 1,
    width: 70,
    alignItems: 'center',
    padding: 2,
  },
  labelStyle: {
    textTransform: 'uppercase',
    fontSize: 8,
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: FONT.NAME.regular,
  },
  indicator: {
    opacity: 0,
  },
});

const Tab = createMaterialTopTabNavigator(
  {
    [ROUTE_NAMES.Home]: navigationOptionsHandler(Home, {
      header: () => null,
      tabBarLabel: renderTab('home', 'Home'),
    }),
    [ROUTE_NAMES.RootMiner]: navigationOptionsHandler(MinerNavigator, {
      title: 'Nodes',
      header: () => null,
      tabBarLabel: renderTab('nodes', 'Nodes'),
    }),
    [ROUTE_NAMES.Wallet]: navigationOptionsHandler(Wallet, {
      title: 'Wallet',
      header: () => null,
      tabBarLabel: renderTab('wallet', 'Wallet'),
    }),
    [ROUTE_NAMES.Dex]: navigationOptionsHandler(Dex, {
      title: 'pDex',
      header: () => null,
      tabBarLabel: renderTab('community', 'Community'),
    }),
  },
  {
    initialRouteName: ROUTE_NAMES.Home,
    swipeEnabled: false,
    animationEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: styles.container,
      tabStyle: styles.tabStyle,
      indicatorStyle: styles.indicator,
    },
    defaultNavigationOptions: {
      header: HeaderBar,
    },
    headerMode: 'screen',
    navigationOptions: ({navigation, screenProps}) => {
      const child = getActiveChildNavigationOptions(navigation, screenProps);
      const {routeName} = navigation.state.routes[navigation.state.index];

      // console.log(TAG,'navigationOptions child = ',child);
      // You can do whatever you like here to pick the title based on the route name
      const title = routeName;

      return {
        title,
        gesturesEnabled: false,
        ...child,
      };
    },
  },
);

export default Tab;
