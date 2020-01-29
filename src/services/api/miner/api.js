
import { CONSTANT_MINER } from '@src/constants';
import { API_MINER_URL, API_REQUEST_STAKE_URL, TRACK_LOG_URL } from 'react-native-dotenv';

const API_URL = API_MINER_URL || '';
export default class API {
  static SIGN_IN_API = `${API_URL}/auth`;
  static SIGN_UP_API = `${API_URL}/user/signup`;

  static VERIFY_CODE_API = `${API_URL}/product/verify-code`;
  static PRODUCT_LIST_API = `${API_URL}/product/list`;
  static REMOVE_PRODUCT_API = `${API_URL}/product/remove`;
  static GET_SYSTEM_APP_API = `${API_URL}/system-version?platform=${CONSTANT_MINER.PRODUCT_TYPE}`;
  static REFRESH_TOKEN_API = `${API_URL}/refresh-token`;
  static UPDATE_PRODUCT_API = `${API_URL}/product`;
  static API_REQUEST_STAKE_URL= API_REQUEST_STAKE_URL;
  static TRACK_LOG=`${TRACK_LOG_URL}/app-logs`;
  static GET_LOG=`${TRACK_LOG_URL}/device`;
}
