import { isMobile } from 'react-device-detect';

import dynamic from 'next/dynamic';


import BotttomDrawer from './BotttomDrawer';


// how to use: import Modal from '@/components/modal', don't import Modal from '@/components/modal/Modal or @/components/modal/Drawer'';

const Index = (props: any) => {
  if (isMobile === undefined || !props.isOpen) return <></>;
  if (isMobile && !props.experimental) return <BotttomDrawer {...props} />;
  if (isMobile && props.experimental) return <BotttomDrawer {...props} />;
  return <></>;
};

Index.defaultProps = {
  children: null,
  isOpen: false,
  ctaHeaderTitle: '',
  drawerHeight: 6,
  ctaHeaderFunction: () => {},
  ctaFunction: () => {},
  ctaTitle: undefined,
  shouldClose: true,
  ctaHeaderClassName: 'font-medium text-xs underline',
  ctaVisible: false,
  disabled: false,
  experimental: false,
};

export default Index;
