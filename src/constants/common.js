const CRYPTO_SYMBOL = {
  BTC: 'BTC',
  ETH: 'ETH',
  PRV: 'PRV',
  BNB: 'BNB'
};

const TOKEN_SYMBOL = {
  pETH: 'pETH',
  pBTC: 'pBTC',
  pBNB: 'pBNB'
};

export default {
  // old varibles, maybe remove later
  STAKING_TYPES: {
    SHARD: 0,
    BEACON: 1
  },
  STAKING_AMOUNT: 200,
  STAKING_MIN_FEE: 0.01,
  STAKING_ADDRESS: '1NHp2EKw7ALdXUzBfoRJvKrBBM9nkejyDcHVPvUjDcWRyG22dHHyiBKQGL1c',
  DEFRAGMENT_DEFAULT_AMOUNT: 1,
  DEFRAGMENT_MIN_FEE: 0.01,
  DEFRAGMENT_SET_DEFAULT_PRIVACY: true,

  // for new app
  CRYPTO_SYMBOL,
  TOKEN_SYMBOL,
  DECIMALS: {
    MAIN_CRYPTO_CURRENCY: 9,
    [CRYPTO_SYMBOL.PRV]: 9,
  },
  TOKEN_TX_TYPE: {
    INIT: 0,
    SEND: 1
  },
  ADDRESS_TYPE: {
    DEPOSIT: 1,
    WITHDRAW: 2 
  },
  PRIVATE_TOKEN_CURRENCY_TYPE: {
    ETH: 1,
    BTC: 2,
    ERC20: 3,
    BNB: 4,
    BNB_BEP2: 5,
    USD: 6
  },
  PTOKEN_TYPE: {
    COIN: 0,
    ERC20: 1
  },
  HISTORY: {
    TYPE: {
      DEPOSIT: 1, // same with PRIVATE_TOKEN_HISTORY_ADDRESS_TYPE.DEPOSIT
      WITHDRAW: 2, // same with PRIVATE_TOKEN_HISTORY_ADDRESS_TYPE.WITHDRAW
      SEND: 3, // custom
      RECEIVE: 4 // custom
    },
    STATUS_TEXT: {
      SUCCESS: 'SUCCESS',
      FAILED: 'FAILED',
      PENDING: 'PENDING'
    }
  }
};