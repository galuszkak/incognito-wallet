/* eslint-disable import/no-cycle */
import {CONSTANT_CONFIGS} from '@src/constants';
import Device, {DATA_INFO} from '@src/models/device';
import LocalDatabase from '@src/utils/LocalDatabase';
import Util from '@src/utils/Util';
import _ from 'lodash';
import APIService, {METHOD} from './api/miner/APIService';
import Server from './wallet/Server';


const TAG = 'VirtualNodeService';
// const DATA_INFO = [ {'status':'offline', 'message':'ready','code':DEVICE_STATUS.CODE_START},
//   {'status':'syncing', 'message':'syncing','code':DEVICE_STATUS.CODE_SYNCING},
//   {'status':'ready', 'message':'ready','code':DEVICE_STATUS.CODE_START},
//   {'status':'mining', 'message':'earning','code':DEVICE_STATUS.CODE_MINING},
//   {'status':'pending', 'message':'waiting to be selected','code':DEVICE_STATUS.CODE_PENDING},
//   {'status':'notmining', 'message':'ready','code':DEVICE_STATUS.CODE_START}];
const timeout = 8;
const PREFIX_BLS_PARAMS = 'bls:';
export const LIST_ACTION={
  GET_BEACON_BEST_STATE_DETAIL:{
    key:'getbeaconbeststatedetail',
    data:(params=[])=>{
      return {
        'jsonrpc': '1.0',
        'method': 'getbeaconbeststatedetail',
        'params': params,
        'id': 1
      };
    }
  },
  GET_PUBLIC_KEY_ROLE:{
    key:'getpublickeyrole',
    data:(params=[])=>{
      return {
        'jsonrpc': '1.0',
        'method': 'getpublickeyrole',
        'params': params,
        'id': 1
      };
    }
  },
  GET_PRIVACY_CUSTOM_TOKEN:{
    key:'listprivacycustomtoken',
    data:{
      'jsonrpc': '1.0',
      'method': 'listprivacycustomtoken',
      'params': [],
      'id': 1
    }
  },
  GET_PUBLIC_KEY_MINING:{
    key:'getpublickeymining',
    data:{
      'jsonrpc': '1.0',
      'method': 'getpublickeymining',
      'params': [],
      'id': 1
    }
  },
  GET_REWARD_AMOUNT:{
    key:'getrewardamount',
    data:({paymentAddress=''})=>{
      return {
        'jsonrpc': '1.0',
        'method': 'getrewardamount',
        'params': [paymentAddress],
        'id': 1
      };
    }
  },
  GET_MINER_REWARD_FROM_MINING_KEY:{
    key:'getminerrewardfromminingkey',
    data:({blsData=''})=>{
      return {
        'jsonrpc': '1.0',
        'method': 'getminerrewardfromminingkey',
        'params': [blsData],
        'id': 1
      };
    }
  },
  GET_MINING_INFO:{
    key: 'getmininginfo',
    data:{
      'jsonrpc': '1.0',
      'method': 'getmininginfo',
      'params': [],
      'id': 1
    }
  },
  GET_CHAIN_MINING_STATUS:{
    key:'getchainminingstatus',
    data:{
      'jsonrpc': '1.0',
      'method': 'getchainminingstatus',
      'params': [],
      'id': 1
    }
  }

};
export default class VirtualNodeService {

  static getMininginfo = async(device:Device)=>{
    try {
      let apiURL = await VirtualNodeService.buildURL(device);
      if(!_.isEmpty(apiURL)){
        apiURL = `${apiURL}/${LIST_ACTION.GET_MINING_INFO.key}`;
        const buildParams = LIST_ACTION.GET_MINING_INFO.data;
        console.log(TAG,'getMiningInfo buildParams = ',buildParams);
        const response = await Util.excuteWithTimeout(APIService.getURL(METHOD.POST, apiURL, buildParams, false,false),timeout);

        console.log(TAG,'getMiningInfo result',response);
        return response;
      }
    } catch (error) {
      console.log(TAG,'getMiningInfo error',error);
    }
    return null;
  }

  /**
   *
   * return [string]:key
   */
  static getPublicKeyMining = async(device:Device)=>{
    try {
      let apiURL = await VirtualNodeService.buildURL(device);
      if(!_.isEmpty(apiURL)){
        apiURL = `${apiURL}/${LIST_ACTION.GET_PUBLIC_KEY_MINING.key}`;
        const buildParams = LIST_ACTION.GET_PUBLIC_KEY_MINING.data;
        const response = await Util.excuteWithTimeout(APIService.getURL(METHOD.POST, apiURL, buildParams, false,false), 5);
        const {Result=''} = response;
        const data = Result[0]??'';
        return _.split(data, ':')[1];
      }
    } catch (error) {
      console.log(TAG,'getPublicKeyMining error',error);
    }
  };

  static getPublicKeyRole = async(device:Device)=>{
    try {
      let apiURL = await VirtualNodeService.buildURL(device,false);
      if(!_.isEmpty(apiURL)){
        let blsKey = await VirtualNodeService.getPublicKeyMining(device).catch(err=>{
          console.log(TAG,'getPublicKeyRole getPublicKeyMining error');
        })||'';

        if(!_.isEmpty(blsKey)){

          apiURL = `${apiURL}/${LIST_ACTION.GET_PUBLIC_KEY_ROLE.key}`;
          const buildParams = LIST_ACTION.GET_PUBLIC_KEY_ROLE.data([`${PREFIX_BLS_PARAMS}${blsKey}`]);
          const response = await Util.excuteWithTimeout(APIService.getURL(METHOD.POST, apiURL, buildParams, false,false),timeout);

          console.log(TAG,'getPublicKeyRole result',response);
          const {Result=''} = response;
          return Result;
        }
      }
    } catch (error) {
      console.log(TAG,'getPublicKeyMining error',error);
    }
    return '';
  }

  static isStaked  = async(device:Device)=>{
    try {
      if(device && device.isCallStaked){
        return true;
      }

      let blsKey = await VirtualNodeService.getPublicKeyMining(device).catch(err=>{
        console.log(TAG,'isStaked getPublicKeyMining error');
      })||'';

      if(!_.isEmpty(blsKey)){
        let findItemIndex = await VirtualNodeService.checkStakedWithBlsKey(blsKey);
        device.isCallStaked = findItemIndex;
        await LocalDatabase.updateDevice(device.toJSON());
        return findItemIndex;
      }

    } catch (error) {
      console.log(TAG,'isStaked error',error);
    }
    return false;
  }

  static checkStakedWithBlsKey  = async(blsKey:String)=>{
    try {

      let apiURL = await VirtualNodeService.buildURL(null,true);
      if(!_.isEmpty(apiURL) && !_.isEmpty(blsKey) ){


        apiURL = `${apiURL}/${LIST_ACTION.GET_BEACON_BEST_STATE_DETAIL.key}`;
        const buildParams = LIST_ACTION.GET_BEACON_BEST_STATE_DETAIL.data();
        const response = await Util.excuteWithTimeout(APIService.getURL(METHOD.POST, apiURL, buildParams, false,false),timeout);

        console.log(TAG,'checkStakedWithBlsKey GET_BEACON_BEST_STATE_DETAIL',response);
        const {Result={}} = response??{};

        const {ShardCommittee=[],ShardPendingValidator=[],CandidateShardWaitingForNextRandom=[]} = Result??{};
        let findItemIndex = _.includes(JSON.stringify(ShardCommittee),blsKey) || _.includes(JSON.stringify(ShardPendingValidator),blsKey) || _.includes(JSON.stringify(CandidateShardWaitingForNextRandom),blsKey);
        return findItemIndex;
      }

    } catch (error) {
      console.log(TAG,'checkStakedWithBlsKey error',error);
    }
    return false;
  }

  /*
  *** is sefl node
  */
  static getPrivacyCustomToken = async(device:Device):Promise<Array>=>{
    try {
      let apiURL = await VirtualNodeService.buildURL(device);
      if(!_.isEmpty(apiURL)){
        apiURL = `${apiURL}/${LIST_ACTION.GET_PRIVACY_CUSTOM_TOKEN.key}`;
        const buildParams = LIST_ACTION.GET_PRIVACY_CUSTOM_TOKEN.data;
        const response = await Util.excuteWithTimeout(APIService.getURL(METHOD.POST, apiURL, buildParams, false,false),timeout);

        console.log(TAG,'getPrivacyCustomToken result',response);
        const {Result={}} = response;
        return Result['ListCustomToken']??[];
      }
    } catch (error) {
      console.log(TAG,'getPrivacyCustomToken error',error);
    }
    return [];
  }

  static getRewardAmount = async(device:Device,paymentAddress,isFullNode=false)=>{
    try {

      let apiURL = await VirtualNodeService.buildURL(device,isFullNode);
      console.log(TAG,'getRewardAmount begin',apiURL);
      if(!_.isEmpty(apiURL) && !_.isEmpty(paymentAddress)){
        apiURL = `${apiURL}/${LIST_ACTION.GET_REWARD_AMOUNT.key}`;
        const buildParams = LIST_ACTION.GET_REWARD_AMOUNT.data({paymentAddress:paymentAddress});
        const response = await Util.excuteWithTimeout(APIService.getURL(METHOD.POST, apiURL, buildParams, false,false),timeout);
        // if(_.includes(apiURL,'192.168.11.27')){
        //   console.log(TAG,'getRewardAmount result',response,apiURL);
        // }

        return response;
      }
    } catch (error) {
      console.log(TAG,'getRewardAmount error',error);
    }
    return null;
  }

  static getRewardFromMiningkey = async(device:Device)=>{
    let response = {Result:{}};
    try {

      let blsKey = await VirtualNodeService.getPublicKeyMining(device).catch(err=>{
        console.log(TAG,'getRewardFromMiningkey getPublicKeyMining error');
      })||'';

      let apiURL = await VirtualNodeService.buildURL(device,true);
      if(!_.isEmpty(apiURL) && !_.isEmpty(blsKey)){
        apiURL = `${apiURL}/${LIST_ACTION.GET_MINER_REWARD_FROM_MINING_KEY.key}`;
        const buildParams = LIST_ACTION.GET_MINER_REWARD_FROM_MINING_KEY.data({blsData:`${PREFIX_BLS_PARAMS}${blsKey}`});
        // console.log(TAG,'getRewardFromMiningkey begin ----');
        // response = await Util.excuteWithTimeout(Util.delay(10),timeout).catch(console.log)||null;
        response = await Util.excuteWithTimeout(APIService.getURL(METHOD.POST, apiURL, buildParams, false,false),timeout).catch(console.log)||null;

        console.log(TAG,'getRewardFromMiningkey result',response);
        return response;
      }
    } catch (error) {
      console.log(TAG,'getRewardFromMiningkey error',error);
    }

    return response;
  }

  static getChainMiningStatus = async(device:Device)=>{
    let dataResponseCombinded = {'status': Device.offlineStatus()};
    try {
      let dataResult = await VirtualNodeService.getMininginfo(device).catch(err=>{
        console.log(TAG,'getChainMiningStatus getMininginfo error');
      })||{};
      const shardID = dataResult.Result?.ShardID ?? undefined;

      let apiURL = await VirtualNodeService.buildURL(device);


      if(!_.isEmpty(apiURL) && !_.isNil(shardID)){
        apiURL = `${apiURL}/${LIST_ACTION.GET_CHAIN_MINING_STATUS.key}`;
        const buildParams = {
          ...LIST_ACTION.GET_CHAIN_MINING_STATUS.data,
          'params': [shardID]
        };
        const response = await Util.excuteWithTimeout(APIService.getURL(METHOD.POST, apiURL, buildParams, false,false),timeout);

        const {Result ,Method} = response ?? {};
        const item = DATA_INFO.find((item)=>{
          return _.isEqual(Result,item.status);
        })|| Device.outOfStatus(Result);
        dataResponseCombinded = {'status': {'code': item.code ,'message':item.message }};
        console.log(TAG,'getChainMiningStatus begin apiURL = ',apiURL);
        console.log(TAG,'getChainMiningStatus result',response);
        console.log(TAG,'getChainMiningStatus end --------');
        return {status:1, data:dataResponseCombinded,productId:device.ProductId};
      }
    } catch (error) {
      console.log(TAG,'getChainMiningStatus error',error);
      return {status:-1, data:dataResponseCombinded};
    }
  }

  static buildURL = async(device:Device,isFullNode= false)=>{
    if (isFullNode) {
      let fullNode = ((await Server.getDefault())?.address)||CONSTANT_CONFIGS.MASTER_NODE_ADDRESS;
      console.log(TAG,'buildURL = ',fullNode);
      return fullNode;
    }

    const url = device.APIUrl??'';

    if (url.indexOf('http') === 0 || url.indexOf('https') === 0) {
      return url;
    }

    return `http://${device.APIUrl??''}`;
  }
}
