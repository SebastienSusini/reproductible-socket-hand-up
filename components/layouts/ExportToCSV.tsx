import React, { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Button from '../buttons/Button';

interface Props {
  text: string;
  fileName: string;
  className: string;
  rewardId?: string;
  callbackFunc: Function;
}

const ExportToCSV = ({ text, fileName, rewardId, className, callbackFunc }: Props) => {
  const { t } = useTranslation('backstage');
  const { locale } = useRouter();
  const [csv, setCsv] = useState<{ data: any[]; headers: any[]; isLoading: boolean }>({
    data: [],
    headers: [],
    isLoading: false,
  });
  const csvLinkRef = useRef<any>(null);

  const handleExport = async () => {
    setCsv({ data: [], headers: [], isLoading: true });
    const res = await callbackFunc(locale as string, rewardId);

    if (res.error) {
      setCsv({ data: [], headers: [], isLoading: false });
      return;
    }
    setCsv({ data: res.data, headers: res.headers, isLoading: false });
  };

  useEffect(() => {
    if (csv.data.length > 0 && csv.headers.length > 0 && csvLinkRef.current && !csv.isLoading) {
      csvLinkRef.current.link.click();
    }
  }, [csv]);

  return (
    <>
      <Button
        as="unstyled"
        className={className}
        onClick={handleExport}
        disabled={csv.isLoading}
        loading={{
          isLoading: csv.isLoading,
          loadingText: t('loading'),
        }}
      >
        {text}
      </Button>

      <CSVLink
        data={csv.data}
        headers={csv.headers}
        asyncOnClick={true}
        filename={fileName}
        ref={csvLinkRef}
        className="hidden"
      />
    </>
  );
};

export default ExportToCSV;
