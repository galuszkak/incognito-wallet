import {CONSTANT_CONFIGS} from '@src/constants';
import formatUtil from '@src/utils/format';

export const tokenFactories = (tokenInfo, selectedPrivacy) => {
  const {
    name,
    symbol,
    externalSymbol,
    tokenId,
    contractId,
    amount,
    pDecimals,
    incognitoTotalSupply,
    isBep2Token,
  } = selectedPrivacy;
  return [
    {label: 'Name', value: name},
    {label: 'Ticker', value: symbol},
    {
      label: 'Original Ticker',
      value: externalSymbol,
      link:
        isBep2Token &&
        `${CONSTANT_CONFIGS.BINANCE_EXPLORER_URL}/asset/${externalSymbol}`,
    },
    {
      label: 'Coin supply',
      value: incognitoTotalSupply
        ? formatUtil.amount(incognitoTotalSupply, pDecimals)
        : '',
    },
    {label: 'Balance', value: formatUtil.amount(amount, pDecimals)},
    {label: 'Coin ID', value: tokenId, copyable: true},
    {
      label: 'Contract ID',
      value: contractId,
      copyable: true,
      link: `${CONSTANT_CONFIGS.ETHERSCAN_URL}/token/${contractId}`,
    },
    {
      label: 'Owner address',
      value: tokenInfo?.showOwnerAddress ? tokenInfo?.ownerAddress : '',
      copyable: true,
    },
    {label: 'Owner email', value: tokenInfo?.ownerEmail, copyable: true},
    {
      label: 'Owner website',
      value: tokenInfo?.ownerWebsite,
      link: tokenInfo?.ownerWebsite,
      copyable: true,
    },
  ];
};
