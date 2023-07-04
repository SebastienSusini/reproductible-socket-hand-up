import { socketHangUpNftSwapV3Address, socketHangUpNftV3Address } from './addresses';

export interface IContractAddressesConfig {
  [key: string]: {
    socketHangUpNFT: `0x${string}` | undefined;
    socketHangUpNFTSwap: `0x${string}` | undefined;
  };
}

export interface IContractAddressesConfigReturn {
  socketHangUpNFT: `0x${string}` | undefined;
  socketHangUpNFTSwap: `0x${string}` | undefined;
}

export const contractAddressesConfig: IContractAddressesConfig = {
  v3: {
    socketHangUpNFT: socketHangUpNftV3Address as `0x${string}` | undefined,
    socketHangUpNFTSwap: socketHangUpNftSwapV3Address as `0x${string}` | undefined,
  },
  v4: {
    socketHangUpNFT: undefined,
    socketHangUpNFTSwap: undefined,
  },
};
