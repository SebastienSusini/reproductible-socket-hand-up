import React from 'react';

import { useTranslation } from 'next-i18next';

import { ConnectButton } from '@rainbow-me/rainbowkit';

interface Props {
  classNames?: string;
}

const RainbowConnect = ({ classNames }: Props) => {
  const { t } = useTranslation('common');
  const classes = `primary w-full ${classNames}`;

  return (
    <ConnectButton.Custom>
      {({ mounted, account, chain, openConnectModal }) => {
        const connected = mounted && account && chain;

        return (
          <div
            style={{ width: '100%' }}
            {...(!mounted && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {/* eslint-disable-next-line consistent-return */}
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className={classes}>
                    {t('connect')}
                  </button>
                );
              }
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default RainbowConnect;
