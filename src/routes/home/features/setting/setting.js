import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import Accounts from '@src/routes/accounts';
import Networks from '@src/routes/home/features/networks';
import Security from '@src/routes/home/features/security';
import Decimal from '@src/routes/home/features/decimal';
import OptionMenu from '@src/routes/accounts/features/optionMenu';
import withSetting from './setting.enhance';
import {styled} from './setting.styled';

const Hook = ({label = '', children, rightLabel = null}) => {
  return (
    <View style={[styled.hookContainer]}>
      <View style={styled.heading}>
        <Text style={styled.label}>{label}</Text>
        {rightLabel}
      </View>
      {children}
    </View>
  );
};

const Setting = () => {
  const hookFactories = [
    {
      label: 'YOUR ACCOUNTS',
      children: <Accounts />,
      rightLabel: <OptionMenu />,
      id: 1,
    },
    {
      label: 'NETWORKS',
      children: <Networks />,
      id: 2,
    },
    {
      label: 'SERCURITY',
      children: <Security />,
      id: 3,
    },
    {
      label: 'Decimal separator',
      children: <Decimal />,
      id: 4,
    },
  ];
  return (
    <ScrollView style={styled.extra}>
      {hookFactories.map(item => (
        <Hook key={item.id} {...item}>
          {item.children}
        </Hook>
      ))}
    </ScrollView>
  );
};

Setting.propTypes = {};

Hook.defaultProps = {
  label: '',
  children: null,
  rightLabel: null,
};

Hook.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
  rightLabel: PropTypes.any,
};

export default withSetting(Setting);
