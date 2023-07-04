// Wait for the next release to use this connector

import { MagicAuthConnector } from '@everipedia/wagmi-magic-connector';

const magicAuthApiKey = process.env.NEXT_PUBLIC_MAGIC_AUTH_API_KEY;
const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

export const rainbowAuthMagicConnector = ({ chains }: any) => ({
  id: 'magic',
  name: 'Magic',
  iconUrl: 'https://svgshare.com/i/uRo.svg',
  iconBackground: '#ffffff',
  createConnector: () => {
    const connector = new MagicAuthConnector({
      chains,
      options: {
        apiKey: magicAuthApiKey!,
        enableSMSLogin: true,
        enableEmailLogin: true,
        accentColor: '#93B0FF',
        magicSdkConfiguration: {
          network: {
            rpcUrl: isProduction
              ? 'https://polygon-rpc.com/'
              : 'https://rpc.ankr.com/polygon_mumbai',
            chainId: isProduction ? 137 : 80001,
          },
        },
        customHeaderText: 'Create a wallet with Magic',
      },
    });
    return {
      connector,
    };
  },
});
