import {
  ACTION_FETCHING,
  ACTION_FETCHED,
  ACTION_FETCH_FAIL,
} from './token.constant';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_FETCHING: {
      const {tokenId} = action.payload;
      return {
        ...state,
        [tokenId]: {
          isFetching: true,
          isFetched: false,
          data: {},
          tokenId,
        },
      };
    }
    case ACTION_FETCHED: {
      const {tokenId, data} = action.payload;
      return {
        ...state,
        [tokenId]: {
          ...state[tokenId],
          data: {...data},
          isFetched: true,
          isFetching: false,
        },
      };
    }
    case ACTION_FETCH_FAIL: {
      const {tokenId} = action.payload;
      return {
        ...state,
        [tokenId]: {
          ...state[tokenId],
          isFetched: false,
          isFetching: false,
        },
      };
    }
    default:
      return state;
  }
};
