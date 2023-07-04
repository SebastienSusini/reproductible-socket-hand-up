import React, { useEffect, useState } from 'react';

import { log } from 'next-axiom';
import { useTranslation } from 'next-i18next';

import { getCookie, hasCookie, setCookie } from 'cookies-next';


import Button from '../buttons/Button';

const ENV = process.env.NEXT_PUBLIC_NODE_ENV;

const Consent = () => {
  const { t, i18n } = useTranslation('common');
  const [consent, setConsent] = useState(true);

  const isConsent = getCookie('localConsent');


  useEffect(() => {
    setConsent(hasCookie('localConsent'));
  }, []);

  const acceptCookie = async () => {
    setConsent(true);
    setCookie('localConsent', 'true', { maxAge: 60 * 60 * 24 * 365 });
  };

  const closeP = async () => {
    setConsent(true);
  };

  const denyCookie = () => {
    setConsent(true);
    setCookie('localConsent', 'false', { maxAge: 60 * 60 * 24 * 365 });
  };

  if (consent === true) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-3 left-3 z-50 w-4/5 rounded-xl bg-white p-4 shadow-md md:w-1/4	 ${
        consent ? 'hidden' : ''
      }`}
    >
      <p
        onClick={closeP}
        className="float-right mb-2 cursor-pointer text-xs font-normal text-skyblue-500"
      >
        {t('consent.close')}
      </p>

      <div />

      <h2 className="clear-both font-satoshi text-xl">{t('consent.title')}</h2>


      <div className="flex justify-between align-middle">
        <Button as="unstyled" onClick={denyCookie} className="text-xs text-skyblue-600">
          {t('consent.continueNoAccept')}
        </Button>
        <Button
          as="unstyled"
          onClick={acceptCookie}
          className="rounded-md bg-skyblue-400 px-3 py-2 text-sm font-bold text-white"
        >
          {t('consent.accept')}
        </Button>
      </div>
    </div>
  );
};

export default Consent;
