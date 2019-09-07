import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Divider } from '@src/components/core';
import OptionMenu from '@src/components/OptionMenu';
import { accountSeleclor } from '@src/redux/selectors';
import Icons from 'react-native-vector-icons/Entypo';
import FIcons from 'react-native-vector-icons/Feather';
import MdIcons from 'react-native-vector-icons/MaterialIcons';
import ROUTE_NAMES from '@src/router/routeNames';
import { setDefaultAccount, reloadAccountFollowingToken, getBalance as getAccountBalance } from '@src/redux/actions/account';
import { COLORS } from '@src/styles';
import Section from './Section';
import { accountSection } from './style';

const createItem = (account, onSwitch, onExport, isActive) => (
  <View style={accountSection.container}>
    <TouchableOpacity style={accountSection.name} onPress={() => onSwitch(account)}>
      <View style={[accountSection.indicator, isActive && accountSection.indicatorActive]} />
      <FIcons name={isActive ? 'user-check' : 'user'} size={20} color={isActive ? COLORS.primary : COLORS.lightGrey4} />
      <Text style={isActive ? accountSection.nameTextActive : accountSection.nameText}>{account?.name}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={accountSection.actionBtn} onPress={() => onExport(account)}>
      <Icons name='key' size={20} color={COLORS.lightGrey3} />
    </TouchableOpacity>
  </View>
);


const AccountSection = ({ navigation, defaultAccount, listAccount, setDefaultAccount, reloadAccountFollowingToken, getAccountBalance }) => {
  const onHandleSwitchAccount = async account => {
    try {
      setDefaultAccount(account);
      await getAccountBalance(account);
      await reloadAccountFollowingToken(account);
    } catch {
      console.warn('Switched account successfully, but can not load account details, please reload manually');
    }
  };

  const handleExportKey = account => {
    navigation.navigate(ROUTE_NAMES.ExportAccount, { account });
  };

  const handleImport = () => {
    navigation.navigate(ROUTE_NAMES.ImportAccount, { onSwitchAccount: onHandleSwitchAccount });
  };

  const handleCreate = () => {
    navigation.navigate(ROUTE_NAMES.CreateAccount, { onSwitchAccount: onHandleSwitchAccount });
  };

  const menu = [
    {
      id: 'import',
      icon: <MdIcons name="input" size={25} />,
      desc: 'Import an existing account',
      label: 'Import',
      handlePress: handleImport
    },
    {
      id: 'create',
      icon: <MdIcons name="add" size={25} />,
      desc: 'Create a new account',
      label: 'Create',
      handlePress: handleCreate
    }
  ];

  return (
    <Section
      label='Your accounts'
      headerRight={(
        <OptionMenu data={menu} icon={<Icons name='dots-three-horizontal' size={20} style={{ color: COLORS.lightGrey1 }} />} style={accountSection.optionMenu} />
      )}
      customItems={
        listAccount?.map((account, index) => (
          <View key={account?.name} style={accountSection.itemWrapper}>
            {createItem(account, onHandleSwitchAccount, handleExportKey, account?.name === defaultAccount?.name)}
            { (index === listAccount.length - 1) && <Divider height={1} color={COLORS.lightGrey5} /> }
          </View>
        ))
      }
    />
  );
};

AccountSection.propTypes = {
  navigation: PropTypes.object.isRequired,
  defaultAccount: PropTypes.object.isRequired,
  listAccount: PropTypes.arrayOf(PropTypes.object).isRequired,
  setDefaultAccount: PropTypes.func.isRequired,
  reloadAccountFollowingToken: PropTypes.func.isRequired,
  getAccountBalance: PropTypes.func.isRequired,
};

const mapState = state => ({
  defaultAccount: accountSeleclor.defaultAccount(state),
  listAccount: accountSeleclor.listAccount(state)
});

const mapDispatch = { setDefaultAccount, reloadAccountFollowingToken, getAccountBalance };

export default connect(mapState, mapDispatch)(AccountSection);