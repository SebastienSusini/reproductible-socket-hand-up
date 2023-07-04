import { useTranslation } from 'next-i18next';

import Tag from './Tag';

interface TagWrapperProps {
  isNew: boolean;
  isSoldOut: boolean | undefined;
  hasListings?: boolean;
  listingsCount?: number;
  active?: boolean;
  color: 'blue' | 'light' | 'red';
  size: 'small' | 'medium' | 'large';
}

const TagWrapper = (props: TagWrapperProps) => {
  const { t } = useTranslation('song');
  const { isNew, isSoldOut, hasListings, listingsCount, active = true, color, size } = props;

  return (
    <>
      {active &&
        (isNew && !isSoldOut ? (
          <Tag color={color} size={size}>
            New
          </Tag>
        ) : isSoldOut && !hasListings ? (
          <Tag color="red" size={size}>
            Sold out
          </Tag>
        ) : hasListings ? (
          <Tag color="green" size={size}>
            {t('banner.onSale', { count: listingsCount })}
          </Tag>
        ) : null)}
    </>
  );
};

export default TagWrapper;
