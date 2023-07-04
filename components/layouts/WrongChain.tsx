import React from 'react';

import { useTranslation } from 'next-i18next';

import { useDisconnect, useSwitchNetwork } from 'wagmi';

import Button from '../buttons/Button';

interface Props {
  chainId: number | undefined;
  validChain: number;
}

const WrongChain = ({ chainId, validChain }: Props) => {
  const { t } = useTranslation('common');
  const { error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();
  const { disconnect } = useDisconnect();

  return (
    <div className="space-y-8 px-4 pt-8 text-center">
      <h2 className="text-dark">{t('wrongChain.title')}</h2>
      <p className="text-skyblue-500">{t('wrongChain.description')}</p>

      <div className="space-y-3">
        <Button
          as="button"
          styleType="primary"
          className="mx-auto"
          disabled={!switchNetwork || chainId === validChain || isLoading}
          loading={{
            isLoading: isLoading && pendingChainId === validChain,
            loadingText: 'Switching ...',
          }}
          onClick={() => switchNetwork?.(validChain)}
        >
          {t('wrongChain.ctaText')}
        </Button>

        <p className="text-sm">Or</p>

        <p className="cursor-pointer text-skyblue-500 underline" onClick={() => disconnect()}>
          {t('wrongWallet.ctaText')}
        </p>

        <div>{error && error.message}</div>
      </div>
    </div>
  );
};

export default WrongChain;
