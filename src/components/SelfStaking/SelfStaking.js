import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ScrollView, View, Text, Toast, Picker } from '@src/components/core';
import EstimateFee from '@src/components/EstimateFee';
import StakeValidatorTypeSelector from '@src/components/StakeValidatorTypeSelector';
import tokenData from '@src/constants/tokenData';
import { CONSTANT_COMMONS } from '@src/constants';
import LoadingTx from '@src/components/LoadingTx';
import formatUtil from '@src/utils/format';
import convertUtil from '@src/utils/convert';
import styles from './style';

class SelfStaking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStaking: false,
      finalFee: null,
      feeUnit: null,
      amount:  null,
      stakeTypeId: CONSTANT_COMMONS.STAKING_TYPES.SHARD,
      funderAccount: null,
      minerAccount: null,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    let state = {};
    const { getAccountByName, minerAccountName, funderAccountName } = nextProps;
    if (getAccountByName) {
      state = {
        ...state,
        minerAccount: getAccountByName(minerAccountName || funderAccountName)
      };
    }

    if (getAccountByName && funderAccountName) {
      state = {
        ...state,
        funderAccount: getAccountByName(funderAccountName)
      };
    }

    return state;
  }

  handleSelectFee = ({ fee, feeUnit }) => {
    this.setState({ finalFee: fee, feeUnit });
  }

  handleStakeTypeChange = ({ id, amount }) => {
    this.setState({ stakeTypeId: id, amount });
  }

  handleStake = async () => {
    try {
      this.setState({
        isStaking: true
      });

      const { onStaking, getAccountByName,onCallBackStaked } = this.props;
      const { stakeTypeId, finalFee, minerAccount, funderAccount } = this.state;
      if (typeof onStaking === 'function') {
        const rs = await onStaking({
          stakeType: stakeTypeId,
          fee: finalFee,
          minerAccount,
          funderAccount
        });

        if (rs?.txId) {
          Toast.showInfo('Stake completed!');
          if(onCallBackStaked instanceof Function ){ 
            onCallBackStaked(rs);
          }
        } else {
          throw new Error('Stake failed with no tx id');
        }
      }
    } catch {
      Toast.showError('Stake failed, please try again');
    } finally {
      this.setState({
        isStaking: false
      });
    }
  }

  render() {
    const { amount, finalFee, feeUnit, stakeTypeId, isStaking, minerAccount, funderAccount } = this.state;
    const { selectedPrivacy } = this.props;
    const toAddress = minerAccount?.paymentAddress || selectedPrivacy?.paymentAddress;
    const isNotEnoughBalance = amount > funderAccount?.value;
    const isCanSubmit = !isNotEnoughBalance;

    return (
      <View>
        <ScrollView>
          <StakeValidatorTypeSelector
            stakeTypeId={stakeTypeId}
            onChange={this.handleStakeTypeChange}
            style={styles.stakeSelector}
          />
          <EstimateFee
            initialFee={0}
            finalFee={finalFee}
            onSelectFee={this.handleSelectFee}
            types={[tokenData.SYMBOL.MAIN_CRYPTO_CURRENCY]}
            amount={convertUtil.toHumanAmount(amount, CONSTANT_COMMONS.DECIMALS.MAIN_CRYPTO_CURRENCY)}
            toAddress={toAddress}
            style={styles.estFee}
          />
          <Text style={styles.feeText}>
            You&apos;ll pay: {formatUtil.amount(finalFee, feeUnit === tokenData.SYMBOL.MAIN_CRYPTO_CURRENCY ? CONSTANT_COMMONS.DECIMALS.MAIN_CRYPTO_CURRENCY : null)} {feeUnit}
          </Text>
          <Button disabled={!isCanSubmit} title='Stake' style={styles.stakeButton} onPress={this.handleStake} />
        </ScrollView>
        { isStaking && <LoadingTx /> }
      </View>
    );
  }
}

SelfStaking.propTypes = {
  selectedPrivacy: PropTypes.object.isRequired
};

export default SelfStaking;