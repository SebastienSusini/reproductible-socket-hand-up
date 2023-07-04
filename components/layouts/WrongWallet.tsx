import { useState } from 'react';

import { useTranslation } from 'next-i18next';

import { useDisconnect } from 'wagmi';


import { shortenIfAddress } from 'utils/helpers/web3';

import Button from '../buttons/Button';
import { EyeIcon } from '@heroicons/react/solid';

interface Props {
  shortCurrentUser: any | undefined;
}

const WrongWallet = ({ shortCurrentUser }: Props) => {
  const [error, setError] = useState<Error>();

  const { t } = useTranslation('common');
  const { disconnect } = useDisconnect({
    onError: (err) => setError(err),
  });

  return (
    <div className="space-y-8 px-4 pt-8 text-center">
      <EyeIcon className="mx-auto h-16 w-16" />
      <h2 className="text-dark">{t('wrongWallet.title')}</h2>
      <p className="text-sm text-skyblue-500">{t('wrongWallet.description')}</p>

      <div className="flex items-center justify-center rounded-xl bg-grey-100 p-3">
        <p className="text-sm font-black text-skyblue-400">
          {shortenIfAddress(shortCurrentUser?.wallet_address)}
        </p>
      </div>

      <p className="text-sm text-skyblue-500">{t('wrongWallet.descriptionTwo')}</p>

      <Button as="button" styleType="primary" className="mx-auto" onClick={() => disconnect()}>
        {t('wrongWallet.ctaText')}
      </Button>
      <div>{error && error.message}</div>
    </div>
  );
};

export default WrongWallet;
