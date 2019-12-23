import { Alert, Text, TouchableScale } from '@components/core';
import { Earning } from '@screens/DetailDevice/Loader';
import images from '@src/assets';
import { DEVICES } from '@src/constants/miner';
import Device from '@src/models/device';
import { accountSeleclor } from '@src/redux/selectors';
import DeviceService from '@src/services/DeviceService';
import NodeService, { LIST_ACTION } from '@src/services/NodeService';
import VirtualNodeService from '@src/services/VirtualNodeService';
import LocalDatabase from '@src/utils/LocalDatabase';
import ViewUtil, { onClickView } from '@src/utils/ViewUtil';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './style';

const TAG = 'HomeMineItem';
const descriptionNodeOffline = 'Check if your node is running';
const descriptionMasterNodeOffline = 'Reconnecting to the network. Please wait.';
const descriptionPNodeUnStaked = 'Your Node is borrowing the required PRV from the pool.\nThis may take up to 24 hours.';
const descriptionPNodeStaked = 'Your Node is now waiting\nto join a committee, where\nit will start earning';
const descriptionVNodeUnStaked = 'Tap here to stake';
const descriptionVNodeStaked = 'Waiting to become a validator';

class HomeMineItem extends React.Component {
  constructor(props){
    super(props);
    const {item,wallet} = props;
    this.state = {
      item:item,
      account:{},
      balance:null,
      timeToUpdate:0,
      deviceInfo : Device.getInstance(item)
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if(!_.isEqual(nextProps.timeToUpdate,prevState.timeToUpdate)){
      console.log(TAG,'getDerivedStateFromProps begin 010101');
      return {
        item:nextProps?.item,
        balance:null,
        timeToUpdate:nextProps?.timeToUpdate,
        deviceInfo:Device.getInstance(nextProps?.item)
      };
    }

    return null;
  }

  async componentDidUpdate(prevProps,prevState){
    const {item,timeToUpdate} = this.props;

    if(!_.isEqual(prevProps.timeToUpdate,timeToUpdate) || !_.isEqual(item,prevProps?.item)){
      console.log(TAG,'componentDidUpdate begin timeToUpdate = ',timeToUpdate);
      await this.getInfo();

      this.checkActive();
    }

  }

  async componentDidMount(){
    await this.getInfo();
    this.checkActive();
  }
  getInfo = async ()=>{
    const {getAccountByName,wallet,callbackReward} = this.props;
    let {deviceInfo,account,balance} = this.state;

    account = await getAccountByName(deviceInfo.accountName());
    balance = await DeviceService.getRewardAmount(deviceInfo);
    console.log(TAG,'getInfo name,balance = ',deviceInfo.Name,balance);
    // should be is null or number;
    balance = _.isNaN(balance)?null:balance;
    // balance = 1000000000 - balance/3;
    if(_.isNumber(balance) && balance >=0 ){
      balance = balance * deviceInfo.CommissionFromServer;
      callbackReward(balance);
      balance = DeviceService.formatForDisplayBalance(balance);
    }else{
      callbackReward(0);
    }

    console.log(TAG,'getInfo balance format = ',balance);
    this.setState({
      account:account,
      balance:balance
    });
  }

  isFullNodeDie = ()=>{
    const {balance } = this.state;
    return balance ==-1;
  }

  handleGotoDetailScreen = onClickView(()=>{
    const {onPress} = this.props;
    const {item} = this.state;
    onPress && onPress(item);
  });
  checkActive = async ()=>{
    const {item} = this.props;
    let {deviceInfo} = this.state;
    const isActive = true;

    if(isActive){
      console.log(TAG,'checkActive begin deviceType = ',deviceInfo.Type);
      let dataResult = {};
      switch(deviceInfo.Type){
      case DEVICES.VIRTUAL_TYPE:{
        dataResult = await VirtualNodeService.getChainMiningStatus(deviceInfo) ?? {};
        console.log(TAG,'checkActive VIRTUAL_TYPE ',dataResult);
        break;
      }
      default:{
        dataResult = await NodeService.send(item,LIST_ACTION.CHECK_STATUS).catch(err=>{
          console.log(TAG,'checkActive error');
          this.setDeviceOffline();
        })||{};
      }
      }
      // console.log(TAG,'checkActive begin 010101');
      const { status = -1, data={status:Device.offlineStatus()},productId = -1 } = dataResult;
      if(_.isEqual(status,1) && item?.product_id === productId ){
        // console.log(TAG,'checkActive begin 020202');
        deviceInfo.Status = data.status;
        this.setState({
          deviceInfo:deviceInfo
        });
      }else{
        this.setDeviceOffline();
      }


    }else{
      this.setDeviceOffline();
    }
  }
  setDeviceOffline =()=>{
    let {deviceInfo} = this.state;
    deviceInfo.Status = Device.offlineStatus();
    this.setState({
      deviceInfo:deviceInfo,
    });
  }
  getStyleStatus = ()=>{
    const {deviceInfo} = this.state;
    const styleStatus = DeviceService.getStyleStatus(deviceInfo.Status.code);
    return [styles.groupRight_title,styleStatus];
  }
  getIconWithType = ()=>{
    const {deviceInfo} = this.state;
    const isOffline = deviceInfo.isOffline();
    switch(deviceInfo.Type){
    case DEVICES.VIRTUAL_TYPE:{
      return  isOffline?images.ic_virtual_node_offline:images.ic_virtual_device;
    }
    default:
      return  isOffline?images.ic_node_offline:images.ic_device;
    }
  }

  handlePressRemoveDevice = onClickView(()=>{
    const {item,deviceInfo} = this.state;
    if(deviceInfo.Type == DEVICES.VIRTUAL_TYPE || __DEV__){
      Alert.alert('Confirm','Are you sure to delete this item?',[{text:'Yes',onPress:async ()=>{
        const {reloadList} = this.props;
        await LocalDatabase.removeDevice(item);
        reloadList&&reloadList();
      }},{ text: 'Cancel'}],{cancelable: true});
    }
  });
  getDescriptionStatus = ()=>{
    const {deviceInfo,balance} = this.state;
    
    const isFetchedBalance = !_.isNil(balance) && !_.isNaN(balance);
    let textErrorDevice ='';
    const isStaked = deviceInfo && deviceInfo.isCallStaked;
    if(deviceInfo.isWaiting()){
      textErrorDevice = '---';
    }else{

      if(deviceInfo.isSyncing()){
        if(!isFetchedBalance){
          if(deviceInfo.Type == DEVICES.VIRTUAL_TYPE){
            textErrorDevice = descriptionVNodeStaked;
          }else{
            textErrorDevice = isStaked ?descriptionPNodeStaked :descriptionPNodeUnStaked;
          }
        }else if(balance == -1){
          textErrorDevice = descriptionMasterNodeOffline;
        }
      }else if(deviceInfo.isReady()){
        
        if(deviceInfo.Type == DEVICES.VIRTUAL_TYPE){
          textErrorDevice = isStaked ?descriptionVNodeStaked: descriptionVNodeUnStaked;
        }else{
          textErrorDevice = isStaked ?descriptionPNodeStaked :descriptionPNodeUnStaked;
        }
        
      }else if(!isFetchedBalance && deviceInfo.isOffline()){
        textErrorDevice = descriptionNodeOffline;
      }else if(balance == -1){
        textErrorDevice = descriptionMasterNodeOffline;
      }else if(!isFetchedBalance){
        textErrorDevice = 'Please refresh to reload your balance';
      }
    }
    return textErrorDevice;
  }
  render() {
    const {deviceInfo,balance} = this.state;
    const {containerStyle} = this.props;
    const styleStatus = this.getStyleStatus();
    let textErrorDevice = this.getDescriptionStatus();
    

    const labelName = deviceInfo.Type == DEVICES.VIRTUAL_TYPE? deviceInfo.Name:deviceInfo.qrCodeDeviceId;

    return (
      <TouchableScale
        style={[styles.container,containerStyle]}
        onLongPress={this.handlePressRemoveDevice}
        onPress={this.handleGotoDetailScreen}
      >
        <Image style={styles.imageLogo} source={this.getIconWithType()} />
        <View style={styles.groupLeft}>
          <Text style={styles.groupLeft_title}>{labelName}</Text>
          {_.isEmpty(textErrorDevice) && !_.isNil(balance)&&<Text style={styles.groupLeft_title2}>{`${balance} PRV`}</Text>}
          {!_.isEmpty(textErrorDevice) &&<Text style={styles.groupLeft_title2}>{textErrorDevice}</Text>}

        </View>
        <View style={styles.groupRight}>
          <Text style={styleStatus}>{balance == -1?'Reconnecting':deviceInfo.statusMessage()}</Text>
          {deviceInfo.data.status.code === Device.CODE_UNKNOWN && ViewUtil.loadingComponent()}
          {deviceInfo.data.status.code === Device.CODE_MINING && <View style={styles.earning}><Earning scale={0.65} /></View>}
        </View>
      </TouchableScale>
    );
  }
}

HomeMineItem.defaultProps = {
  containerStyle:null,
  isActive:false,
  onPress:(item)=>{},
  timeToUpdate:0,
  reloadList:()=>{},
  callbackReward:(amount:Number)=>{}
};

HomeMineItem.propTypes = {
  item: PropTypes.object.isRequired,
  getAccountByName:PropTypes.func.isRequired,
  wallet:PropTypes.object.isRequired,
  containerStyle:PropTypes.object,
  isActive:PropTypes.bool,
  timeToUpdate:PropTypes.number,
  onPress:PropTypes.func,
  reloadList:PropTypes.func,
  callbackReward:PropTypes.func,
};
const mapDispatch = { };

export default connect(
  state => ({
    wallet:state.wallet,
    getAccountByName: accountSeleclor.getAccountByName(state),
  }),
  mapDispatch
)(HomeMineItem);

