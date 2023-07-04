import { log } from 'next-axiom';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

import { alchemyId, walletConnectProjectId } from 'utils/constants/api-keys';

import { rainbowAuthMagicConnector } from './connectors/RainbowMagicConnector';

const isProduction = () => process.env.NEXT_PUBLIC_NODE_ENV === 'production';

const { chains, provider, webSocketProvider } = configureChains(
  isProduction() ? [polygon] : [polygonMumbai, polygon],
  [
    jsonRpcProvider({
      priority: 0,
      weight: 2,
      rpc: (_chain) => ({
        http:
          _chain.id === 80001 ? 'https://rpc.ankr.com/polygon_mumbai' : 'https://polygon-rpc.com/',
      }),
    }),
    alchemyProvider({
      apiKey: alchemyId!,
      priority: 1,
      weight: 3,
    }),
    publicProvider({ priority: 2, weight: 1 }),
  ],
  { stallTimeout: 5000 }
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [rainbowAuthMagicConnector({ chains }) as any],
  },
  {
    groupName: 'Popular',
    wallets: [
      injectedWallet({ chains }),
      walletConnectWallet({ chains, projectId: walletConnectProjectId! }),
      metaMaskWallet({ chains, projectId: walletConnectProjectId! }),
      rainbowWallet({ chains, projectId: walletConnectProjectId! }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      coinbaseWallet({ appName: 'socketHangUp', chains }),
      ledgerWallet({ chains, projectId: walletConnectProjectId! }),
      braveWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
  logger: {
    warn: (message) => log.warn(message),
  },
});

export { chains, wagmiClient };
