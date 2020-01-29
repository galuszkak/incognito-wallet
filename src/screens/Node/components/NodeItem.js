import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import VirtualNodeService from '@services/VirtualNodeService';
import NodeService from '@services/NodeService';
import accountService from '@services/wallet/accountService';
import {PRV} from '@services/wallet/tokenService';
import {ExHandler} from '@services/exception';
import {PRV_ID} from '@screens/Dex/constants';
import VNode from './VNode';
import PNode from './PNode';

export const TAG = 'Node';

const MAX_RETRY = 5;
const TIMEOUT = 2; // 2 minutes

class NodeItem extends React.Component {
  state = { loading: false };

  componentDidUpdate(prevProps) {
    const { isFetching } = this.props;
    if (prevProps.isFetching && !isFetching) {
      this.getInfo();
    }
  }

  async getPNodeInfo(device) {
    const { wallet } = this.props;
    await NodeService.fetchAndSavingInfoNodeStake(device);
    const actualRewards = {};
    const commission = device.CommissionFromServer;

    if (device.StakerAddress) {
      const rewards = await accountService.getRewardAmount('', device.StakerAddress, true);

      rewards[PRV.id] = rewards[PRV.symbol];
      delete rewards[PRV.symbol];

      Object.keys(rewards).forEach(key => {
        actualRewards[key] = rewards[key] * commission;
      });

      device.Rewards = actualRewards;
    }

    const listAccount = await wallet.listAccount();
    device.Account = listAccount.find(item => item.PaymentAddress === device.PaymentAddress);

    if (device.Account) {
      device.ValidatorKey = device.Account.ValidatorKey;
    }

    if (device.IsLinked) {
      const res = await NodeService.getLog(device);
      const log = res.Data;
      const { updatedAt } = log;
      if (updatedAt) {
        const startTime = moment(updatedAt);
        const endTime = moment();
        const duration = moment.duration(endTime.diff(startTime));
        const minutes = duration.asMinutes();

        if (minutes > TIMEOUT) {
          device.setIsOnline(Math.max(device.IsOnline - 1, 0));
        } else {
          device.setIsOnline(MAX_RETRY);
        }
      }
    } else if (device.Host) {
      device.setIsOnline(MAX_RETRY);
    } else {
      device.setIsOnline(Math.max(device.IsOnline - 1, 0));
    }

    if (device.PaymentAddress) {
      device.IsWithdrawable = await NodeService.isWithdrawable(device);
    }

    return device;
  }

  async getVNodeInfo(device) {
    const { nodeRewards } = this.props;
    const publicKey = device.PublicKey;

    if (publicKey) {
      device.Rewards = nodeRewards[publicKey] || {};
    }

    return device;
  }

  async getNodeInfo() {
    const { wallet, item, committees } = this.props;
    let device = item;
    let publicKey = device.PublicKey;
    let blsKey = device.PublicKeyMining;
    let newKey;

    if (device.IsVNode) {
      newKey = await VirtualNodeService.getPublicKeyMining(device);
    } else {
      newKey = await NodeService.getBLSKey(device);
    }

    if (newKey && blsKey !== newKey) {
      blsKey = newKey;
    }

    if (newKey) {
      device.setIsOnline(MAX_RETRY);
    } else {
      device.setIsOnline(Math.max(device.IsOnline - 1, 0));
    }

    if (blsKey) {
      const nodeInfo = (committees.AutoStaking.find(node => node.MiningPubKey.bls === blsKey) || {});
      const isAutoStake = nodeInfo.IsAutoStake;
      const newPublicKey = nodeInfo.IncPubKey;

      if (JSON.stringify(committees.ShardPendingValidator).includes(blsKey)) {
        device.Status = 'waiting';
      } else if (
        JSON.stringify(committees.CandidateShardWaitingForNextRandom).includes(blsKey) ||
        JSON.stringify(committees.CandidateShardWaitingForCurrentRandom).includes(blsKey)
      ) {
        device.Status = 'random';
      } else if (JSON.stringify(committees.ShardCommittee).includes(blsKey)) {
        device.Status = 'committee';
      } else {
        device.Status = null;
      }

      if (!isAutoStake) {
        device.UnstakeTx = null;
      } else {
        device.StakeTx = null;
      }

      device.PublicKeyMining = blsKey;
      device.IsAutoStake = isAutoStake;

      if (newPublicKey && newPublicKey !== publicKey) {
        publicKey = newPublicKey;
        device.Account = {};
        device.PublicKey = publicKey;
        device.StakeTx = null;
      }

      const listAccount = await wallet.listAccount();
      const rawAccount = await accountService.getAccountWithBLSPubKey(blsKey, wallet);
      device.Account = listAccount.find(item => item.AccountName === rawAccount?.name);

      if (device.Account) {
        device.ValidatorKey = device.Account.ValidatorKey;
      }
    }

    if (device.IsVNode) {
      device = await this.getVNodeInfo(device);
    } else {
      device = await this.getPNodeInfo(device);
    }

    if (device.Rewards && Object.keys(device.Rewards).length > 0) {
      Object.keys(device.Rewards).forEach(id => {
        if (device.Rewards[id] === 0) {
          delete device.Rewards[id];
        }
      });
    }

    if (!device.Rewards || Object.keys(device.Rewards).length === 0) {
      device.Rewards = { [PRV_ID]: 0 };
    }

    return device;
  }

  getInfo() {
    const { onGetInfoCompleted, index } = this.props;
    this.setState({ loading: true });
    this.getNodeInfo()
      .then((device) => onGetInfoCompleted({ index, device }))
      .catch(e => {
        new ExHandler(e).showErrorToast(true);
        onGetInfoCompleted({ index });
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const {
      withdrawRequests,
      item,
      allTokens,
      onStake,
      onUnstake,
      onWithdraw,
      onRemove,
      onImport,
      isFetching,
    } = this.props;
    const { loading } = this.state;

    if (item.IsPNode) {
      return (
        <PNode
          item={item}
          allTokens={allTokens}
          onImportAccount={onImport}
          onRemoveDevice={onRemove}
          onWithdraw={onWithdraw}
          isFetching={!!isFetching || !!loading}
        />
      );
    }

    const account = item.Account;

    return (
      <VNode
        item={item}
        allTokens={allTokens}
        onRemoveDevice={onRemove}
        onImportAccount={onImport}
        onStake={onStake}
        onUnstake={onUnstake}
        onWithdraw={onWithdraw}
        isFetching={!!isFetching || !!loading}
        withdrawTxs={withdrawRequests[account?.PaymentAddress]}
      />
    );
  }
}

NodeItem.propTypes = {
  wallet: PropTypes.object.isRequired,
  committees: PropTypes.object.isRequired,
  nodeRewards: PropTypes.object.isRequired,
  allTokens: PropTypes.array.isRequired,
  withdrawRequests: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onGetInfoCompleted: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired,
  onStake: PropTypes.func.isRequired,
  onUnstake: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

NodeItem.defaultProps = {};

export default NodeItem;
