import type { IContractAddressesConfigReturn } from 'utils/constants/contract-addresses';
import { contractAddressesConfig } from 'utils/constants/contract-addresses';

interface ITokenList {
  name: string;
  address: string;
  symbol: string;
  decimals: number;
  chainId: number;
  logoURI: string;
}

export const shortenIfAddress = (str: string | null | undefined) => {
  return str ? `${str.substring(0, 6)}...${str.substring(str.length - 4)}` : '';
};

export const getTokenList = (chainId: number | undefined, tokenList: ITokenList[]) => {
  return tokenList.filter((token: any) => token.chainId === chainId);
};

export const blockExplorerURI = (pathname: string) => {
  const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';
  return isProduction
    ? `https://polygonscan.com/${pathname}`
    : `https://mumbai.polygonscan.com/${pathname}`;
};

export const getsocketHangUpContractAddress = (v: number | undefined): IContractAddressesConfigReturn => {
  const version = `v${v}`;

  const contractAddress = contractAddressesConfig;
  return contractAddress[version as keyof typeof contractAddress];
};

export const getGasStationURI = () => {
  const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';
  return isProduction
    ? 'https://gasstation-mainnet.matic.network/v2'
    : 'https://gasstation-mumbai.matic.today/v2';
};
