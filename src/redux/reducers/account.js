import type from '@src/redux/types/account';
import _ from 'lodash';

const TAG = 'reducers-account';
const initialState = {
  list: [],
  defaultAccountName: '',
  isGettingBalance: [],
  import: {
    isFetching: false,
    isFetched: false,
    data: {},
  },
  create: {
    isFetching: false,
    isFetched: false,
    data: {},
  },
};

const setAccount = (list, account) => {
  let newList = [...list];
  // console.log(TAG,'setAccount account = ',account);
  try {
    const foundIndex = list.findIndex(a => a.name === account.name);
    if (foundIndex >= 0) {
      console.log(TAG, 'setAccount 01');
      newList[foundIndex] = account;
    } else {
      newList.push(account);
    }
  } catch (e) {
    console.error(e);
  }
  // console.log(TAG,'setAccount end  = ',newList);
  return newList;
};

const removeByName = (list, accountName) => {
  const newList = [...list];
  try {
    _.remove(newList, _item => _item.name === accountName);
  } catch (e) {
    console.error(e);
  }
  return newList;
};

const setGettingBalance = (list, accountName) => {
  const newList = [...list];
  return newList.includes(accountName) ? newList : [...newList, accountName];
};

const removeGettingBalance = (list, accountName) => {
  const newList = [...list];
  _.remove(newList, item => item === accountName);
  return newList;
};

const reducer = (state = initialState, action) => {
  let newList = [];

  switch (action.type) {
    case type.SET:
      newList = setAccount(state.list, action.data);
      return {
        ...state,
        list: newList,
      };
    case type.SET_LIST:
      return {
        ...state,
        list: [...action.data],
      };
    case type.REMOVE_BY_NAME:
      newList = removeByName(state.list, action.data);
      return {
        ...state,
        list: newList,
      };
    case type.GET_BALANCE:
      return {
        ...state,
        isGettingBalance: setGettingBalance(
          state.isGettingBalance,
          action.data,
        ),
      };
    case type.GET_BALANCE_FINISH:
      return {
        ...state,
        isGettingBalance: removeGettingBalance(
          state.isGettingBalance,
          action.data,
        ),
      };
    case type.SET_DEFAULT_ACCOUNT:
      return {
        ...state,
        defaultAccountName: action.data?.name,
      };
    case type.ACTION_IMPORT_ACCOUNT_FETCHING: {
      return {
        ...state,
        import: {
          ...state.import,
          isFetching: true,
        },
      };
    }
    case type.ACTION_IMPORT_ACCOUNT_FETCHED: {
      return {
        ...state,
        import: {
          ...state.import,
          isFetching: false,
          isFetched: true,
        },
      };
    }
    case type.ACTION_IMPORT_ACCOUNT_ERROR: {
      return {
        ...state,
        import: {
          ...state.import,
          isFetching: false,
          isFetched: false,
        },
      };
    }
    case type.ACTION_CREATE_ACCOUNT_FETCHING: {
      return {
        ...state,
        create: {
          ...state.create,
          isFetching: true,
        },
      };
    }
    case type.ACTION_CREATE_ACCOUNT_FETCHED: {
      return {
        ...state,
        create: {
          ...state.create,
          isFetching: false,
          isFetched: true,
        },
      };
    }
    case type.ACTION_CREATE_ACCOUNT_ERROR: {
      return {
        ...state,
        create: {
          ...state.create,
          isFetching: false,
          isFetched: false,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
