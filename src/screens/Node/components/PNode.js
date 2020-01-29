import accountKey from '@assets/images/icons/account_key.png';
import wifiOffline from '@assets/images/icons/offline_wifi_icon.png';
import wifiOnline from '@assets/images/icons/online_wifi_icon.png';
import unfollowTokenIcon from '@assets/images/icons/unfollowToken.png';
import withdrawBlack from '@assets/images/icons/withdraw_black.png';
import { ActivityIndicator, Button, Image, Text, TouchableOpacity, View } from '@components/core';
import Toast from '@components/core/Toast/Toast';
import OptionMenu from '@components/OptionMenu/OptionMenu';
import FixModal from '@screens/Node/components/FixModal';
import firmwareIcon from '@src/assets/images/icons/firmware.png';
import moreIcon from '@src/assets/images/icons/more_icon.png';
import { COLORS } from '@src/styles';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Loader from './Loader';
import Rewards from './Rewards';
import styles from './style';

const MESSAGES = {
  ACCOUNT_NOT_FOUND: 'Missing account',
  UNSTAKING: 'unstaking in process',
};

class PNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateFirmware: false,
    };
    this.removeDevice = _.debounce(props.onRemoveDevice, 100);
  }

  getDescriptionStatus = () => {
    const { item, isFetching, onImportAccount } = this.props;

    if (isFetching) {
      return null;
    }

    const account = item.AccountName;
    let text = `Account: ${account}`;

    if (!account) {
      return (
        <View style={[styles.row, styles.desc, styles.centerAlign]}>
          <View style={[styles.row, styles.centerAlign]}>
            <Image source={accountKey} style={[styles.icon, styles.disabled]} />
            <Text style={styles.greyText}>{MESSAGES.ACCOUNT_NOT_FOUND}</Text>
          </View>
          <View style={styles.itemRight}>
            <Button
              title="Import"
              buttonStyle={styles.stakeButton}
              onPress={onImportAccount}
            />
          </View>
        </View>
      );
    }

    const isUnstaking = item.Unstaking;
    if (isUnstaking) {
      return (
        <View style={styles.row}>
          <Text style={[styles.desc]}>{text} ({MESSAGES.UNSTAKING})</Text>
          <ActivityIndicator style={styles.loading} size="small" color={COLORS.lightGrey1} />
        </View>
      );
    }

    return (
      <View style={[styles.row, styles.centerAlign, styles.desc]}>
        <Image source={accountKey} style={[styles.icon]} />
        <Text>{text}</Text>
      </View>
    );
  };

  showIp = () => {
    const { item } = this.props;
    Toast.showInfo(item.Host);
  };

  updateFirmware = () => {
    this.setState({ showUpdateFirmware: true });
  };

  renderMenu() {
    const { isFetching, item, onWithdraw } = this.props;
    const menu = [];

    if (isFetching) {
      return null;
    }

    menu.push({
      id: 'update',
      icon: <Image source={firmwareIcon} style={{ width: 25, height: 25, resizeMode: 'contain' }} />,
      label:(
        <View style={styles.withdrawMenuItem}>
          <Text style={styles.withdrawText}>Update firmware</Text>
        </View>
      ),
      desc: 'Get Node perform better.',
      handlePress: null,
    });

    if (global.isDebug()) {
      menu.push({
        id: 'delete',
        icon: <Image source={unfollowTokenIcon} style={{ width: 25, height: 25, resizeMode: 'contain' }} />,
        label: 'Remove physical node',
        desc: 'Remove this node from your display. (DEBUG)',
        handlePress: () => this.removeDevice(item),
      });
    }

    if (!isFetching) {
      const rewards = item.Rewards;
      const pendingWithdraw = !item.IsWithdrawable;
      const isEmptyRewards = _.isEmpty(rewards) || !_.some(rewards, value => value > 0);
      let onClick = () => onWithdraw(item);
      let label = 'Withdraw';
      let desc = 'Withdraw your rewards.';
      if (pendingWithdraw || isEmptyRewards) {
        if (pendingWithdraw) {
          desc = 'This might take up to 12 hours.';
        }
        onClick = null;
        label = (
          <View style={styles.withdrawMenuItem}>
            <Text style={styles.withdrawText}>Withdraw {pendingWithdraw ? 'processing' : ''}</Text>
          </View>
        );
      }

      menu.push({
        id: 'withdraw',
        icon: <Image source={withdrawBlack} style={{ width: 25, height: 25, resizeMode: 'contain' }} />,
        label: label,
        desc: desc,
        handlePress: onClick,
      });
    }

    return <OptionMenu data={menu} icon={<Image source={moreIcon} />} />;
  }

  render() {
    const {item, isFetching, allTokens} = this.props;
    const { showUpdateFirmware } = this.state;
    const labelName = item.Name;

    return (
      <View style={styles.container}>
        { isFetching ? <Loader /> : (
          <>
            <View style={styles.row}>
              <View style={[styles.itemLeft, styles.imageWrapper, styles.hidden]}>
                <Image />
              </View>
              <View style={styles.itemCenter}>
                { isFetching ? <ActivityIndicator size="large" /> : <Rewards item={item} rewards={item.Rewards} allTokens={allTokens} /> }
              </View>
              <View style={[styles.itemRight, styles.imageWrapper]}>
                {this.renderMenu()}
              </View>
            </View>
            <View>
              <View style={[styles.row, styles.centerAlign]}>
                <TouchableOpacity onPress={this.showIp} style={[styles.row, styles.centerAlign]}>
                  <Image source={item.IsOnline ? wifiOnline : wifiOffline} style={[styles.icon]} />
                  <Text style={[styles.itemLeft, !item.IsOnline && styles.greyText]}>Device {labelName}</Text>
                </TouchableOpacity>
                {!isFetching && !item.IsOnline && (
                  <View style={styles.itemRight}>
                    <FixModal item={item} />
                  </View>
                )}
              </View>
              {this.getDescriptionStatus()}
            </View>
            {/* <DialogUpdateFirmware
              visible={showUpdateFirmware}
              onClose={()=>
                this.setState({
                  showUpdateFirmware:false
                })
              }
              device={item}
            /> */}
          </>
        )}
      </View>
    );
  }
}

PNode.propTypes = {
  item: PropTypes.object.isRequired,
  allTokens: PropTypes.array.isRequired,
  onWithdraw: PropTypes.func.isRequired,
  onRemoveDevice: PropTypes.func.isRequired,
  onImportAccount: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default PNode;

