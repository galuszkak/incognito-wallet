import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const LIST_DEVICE = 'PRODUCT_LIST_KEY';

export const api = () => axios.get('');

export const getDevices = () => AsyncStorage.getItem(LIST_DEVICE);
