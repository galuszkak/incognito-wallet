import {CONSTANT_COMMONS, CONSTANT_CONFIGS} from '@src/constants';
import formatUtil from '@src/utils/format';
import {COLORS} from '@src/styles';
import tokenService from '@src/services/wallet/tokenService';
import {getpTokenHistory} from '@src/services/api/history';
import {
  ConfirmedTx,
  FailedTx,
  SuccessTx,
} from '@src/services/wallet/WalletService';

export const getStatusData = (status, statusCode) => {
  let statusText = '';
  let statusColor = COLORS.lightGrey1;
  let statusNumber = null;
  switch (status) {
    case CONSTANT_COMMONS.HISTORY.STATUS_TEXT.PENDING:
      statusNumber = statusCode;
      statusText = 'Pending';
      statusColor = COLORS.blue;
      break;
    case SuccessTx:
      statusNumber = null;
      statusText = 'Pending';
      statusColor = COLORS.blue;
      break;
    case CONSTANT_COMMONS.HISTORY.STATUS_TEXT.SUCCESS:
    case ConfirmedTx:
      statusText = 'Complete';
      statusColor = COLORS.green;
      break;
    case CONSTANT_COMMONS.HISTORY.STATUS_TEXT.FAILED:
    case FailedTx:
      statusText = 'Failed';
      statusColor = COLORS.red;
      break;
    case CONSTANT_COMMONS.HISTORY.STATUS_TEXT.EXPIRED:
      statusText = 'Expired';
      statusColor = COLORS.orange;
      break;
    default:
      break;
  }
  return {
    statusText,
    statusColor,
    statusNumber,
  };
};

export const getTypeData = type => {
  let typeText = '';
  let balanceDirection = '';
  let balanceColor = '';
  switch (type) {
    case CONSTANT_COMMONS.HISTORY.TYPE.WITHDRAW:
      typeText = 'Withdraw';
      balanceColor = COLORS.red;
      balanceDirection = '-';
      break;
    case CONSTANT_COMMONS.HISTORY.TYPE.DEPOSIT:
      typeText = 'Deposit';
      balanceColor = COLORS.green;
      balanceDirection = '+';
      break;
    case CONSTANT_COMMONS.HISTORY.TYPE.SEND:
      typeText = 'Send';
      balanceColor = COLORS.orange;
      balanceDirection = '-';
      break;
    case CONSTANT_COMMONS.HISTORY.TYPE.RECEIVE:
      typeText = 'Receive';
      balanceColor = COLORS.green;
      balanceDirection = '+';
      break;
    default:
      break;
  }
  return {
    typeText,
    balanceColor,
    balanceDirection,
  };
};

export const combineHistory = ({
  histories = [],
  historiesFromApi = [],
  externalSymbol,
  decimals,
  pDecimals,
}) => {
  const data = [];
  historiesFromApi.forEach(h => {
    data.push({
      id: h?.id,
      inchainTx: h?.inchainTx,
      outchainTx: h?.outchainTx,
      time: h?.updatedAt,
      type: h?.addressType,
      toAddress: h?.userPaymentAddress,
      fromAddress: h?.userPaymentAddress,
      amount: h?.incognitoAmount,
      requestedAmount: h?.requestedAmount,
      symbol: externalSymbol,
      decimals,
      pDecimals,
      status: h?.statusText,
      statusCode: h?.status,
      cancelable: h?.cancelable,
      currencyType: h?.currencyType,
      decentralized: h?.decentralized,
      walletAddress: h?.walletAddress,
      privacyTokenAddress: h?.privacyTokenAddress,
      erc20TokenAddress: h?.erc20TokenAddress,
      userPaymentAddress: h?.userPaymentAddress,
      canRetryExpiredDeposit: h?.canRetryExpiredDeposit,
      expiredAt: h?.expiredAt,
      depositAddress: h?.depositTmpAddress,
    });
  });
  histories.forEach(h => {
    data.push({
      id: h?.txID,
      incognitoTxID: h?.txID,
      time: h?.time,
      type: h?.isIn
        ? CONSTANT_COMMONS.HISTORY.TYPE.RECEIVE
        : CONSTANT_COMMONS.HISTORY.TYPE.SEND,
      toAddress: h?.receivers?.length && h?.receivers[0],
      amount: h?.amountPToken,
      symbol: h?.tokenSymbol,
      decimals,
      pDecimals,
      status: h?.status,
      fee: h?.amountNativeToken,
      feePToken: h?.feePToken,
    });
  });

  return data.sort((a, b) =>
    new Date(a.time).getTime() < new Date(b.time).getTime() ? 1 : -1,
  );
};

export const loadTokentHistory = async (wallet, account, token) => {
  try {
    if (!wallet) {
      throw new Error('Wallet is not exist to load history');
    }
    if (!account) {
      throw new Error('Account is not exist to load history');
    }
    return await tokenService.getTokenHistory({
      wallet,
      account,
      token,
    });
  } catch (e) {
    throw e;
  }
};

export const getHistoryFromApi = async tokenSelected => {
  try {
    const {isDeposable, isWithdrawable, paymentAddress} = tokenSelected;
    if (!isWithdrawable || !isDeposable) {
      return;
    }
    return await getpTokenHistory({
      paymentAddress,
      tokenId: tokenSelected?.tokenId,
    });
  } catch (e) {
    throw e;
  }
};

const normalizeHistoryItem = data => {
  for (const key in defaultHistoryItem) {
    if (!data.hasOwnProperty(key)) {
      data[key] = defaultHistoryItem[key];
    }
  }
  return {...data};
};

export const mappingData = data => {
  try {
    const dataNormalize = normalizeHistoryItem(data);
    const {
      status,
      statusCode,
      type,
      amount,
      pDecimals,
      requestedAmount,
      time,
      symbol,
      expiredAt,
      incognitoTxID,
      inchainTx,
      outchainTx,
      toAddress,
      depositAddress,
    } = dataNormalize;
    const statusData = getStatusData(status, statusCode);
    const typeData = getTypeData(type);
    const amountData =
      (amount && formatUtil.amount(amount, pDecimals)) ||
      formatUtil.number(requestedAmount);
    const timeFormat = formatUtil.formatDateTime(time);
    const result = {
      ...dataNormalize,
      ...statusData,
      ...typeData,
      time: timeFormat,
      amount: amountData
        ? `${typeData.balanceDirection}${amount} ${symbol}`
        : '',
      expiredAt: expiredAt ? formatUtil.formatDateTime(expiredAt) : '',
      incognitoTxID: incognitoTxID
        ? `${CONSTANT_CONFIGS.EXPLORER_CONSTANT_CHAIN_URL}/tx/${incognitoTxID}`
        : '',
      inchainTx: inchainTx ? inchainTx : '',
      outchainTx: outchainTx ? outchainTx : '',
      toAddress: toAddress ? toAddress : '',
      depositAddress: depositAddress ? depositAddress : '',
    };
    return result;
  } catch (error) {
    return {...defaultHistoryItem};
  }
};

export const defaultHistoryItem = {
  id: null,
  time: '',
  type: '',
  amount: 0,
  symbol: '',
  fromAddress: '',
  toAddress: '',
  statusCode: '',
  cancelable: false,
  canRetryExpiredDeposit: false,
  pDecimals: 0,
  requestedAmount: 0,
  status: '',
  expiredAt: '',
  depositAddress: '',
  erc20TokenAddress: '',
  privacyTokenAddress: '',
  walletAddress: '',
  incognitoTxID: '',
  inchainTx: '',
  outchainTx: '',
};

export const normalizeHistoriesCrypto = (histories, decimals, pDecimals) =>
  histories.map(h => ({
    id: h?.txID,
    incognitoTxID: h?.txID,
    time: h?.time,
    type: h?.isIn
      ? CONSTANT_COMMONS.HISTORY.TYPE.RECEIVE
      : CONSTANT_COMMONS.HISTORY.TYPE.SEND,
    toAddress: h?.receivers?.length && h?.receivers[0],
    amount: h?.amountNativeToken,
    symbol: CONSTANT_COMMONS.CRYPTO_SYMBOL.PRV,
    status: h?.status,
    fee: h?.feeNativeToken,
    decimals,
    pDecimals,
  }));
