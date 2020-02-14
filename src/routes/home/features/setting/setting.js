import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import Accounts from '@src/routes/home/features/accounts';
import Networks from '@src/routes/home/features/networks';
import Security from '@src/routes/home/features/security';
import Decimal from '@src/routes/home/features/decimal';
import OptionMenu from '@src/routes/home/features/accounts/accounts.optionMenu';
import srcMore from '@src/assets/images/icons/more.png';
import withSetting from './setting.enhance';
import {styled} from './setting.styled';

const Hook = ({label = '', children, rightLabel = null}) => {
  return (
    <View style={styled.hookContainer}>
      <View style={styled.heading}>
        <Text style={styled.label}>{label}</Text>
        {rightLabel}
      </View>
      {children}
    </View>
  );
};

const Setting = props => {
  const hookFactories = [
    {
      label: 'YOUR ACCOUNTS',
      children: <Accounts />,
      rightLabel: <OptionMenu />,
    },
    {
      label: 'NETWORKS',
      children: <Networks />,
    },
    {
      label: 'SERCURITY',
      children: <Security />,
    },
    {
      label: 'Decimal separator',
      children: <Decimal />,
    },
  ];
  return (
    <View style={styled.container}>
      <ScrollView>
        {hookFactories.map((item, key) => (
          <Hook key={key} {...item}>
            {item.children}
          </Hook>
        ))}
      </ScrollView>
    </View>
  );
};

Setting.propTypes = {
  data: PropTypes.shape({
    devices: PropTypes.array.isRequired,
    defaultServerId: PropTypes.number.isRequired,
    isFetched: PropTypes.bool,
    isFetching: PropTypes.bool,
  }),
};

export default withSetting(Setting);
