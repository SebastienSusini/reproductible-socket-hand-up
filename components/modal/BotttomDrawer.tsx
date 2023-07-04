import { useRef } from 'react';
import type { BottomSheetRef } from 'react-spring-bottom-sheet';
import { BottomSheet } from 'react-spring-bottom-sheet';


import Button from '../buttons/Button';

const DrawerHeader = (props: any) => {
  const headerExtraClass = props.ctaHeaderClassName ?? 'link';

  return (
    <div className="flex w-full items-center justify-between" onClick={props.ctaHeaderFunction}>
      <div className={`flex items-center justify-start text-start ${headerExtraClass}`}>
        {props.ctaHeaderTitle}
      </div>
      {props.title && props.title.length > 0 && <h2>{props.title}</h2>}
      <div className="w-[30px] opacity-0">.</div>
    </div>
  );
};

const BotttomDrawer = (props: any) => {
  const sheetRef = useRef<BottomSheetRef>();
  const initRef = useRef<any>(null);

  return (
    <BottomSheet
      ref={sheetRef as any}
      header={<DrawerHeader {...props} />}
      open={props.isOpen}
      onDismiss={() => props.setIsOpen(false)}
      snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight / 0.6]}
      defaultSnap={({ lastSnap, snapPoints }) => lastSnap ?? Math.min(...snapPoints)}
      scrollLocking={true}
      initialFocusRef={initRef}
      className={` font-satoshi`}
    >
      <div ref={initRef} className="px-3 pb-4">
        {props.children}
      </div>

      {props.ctaTitle && props.ctaVisible && (
        <div className="mb-3 flex w-full justify-center">
          <Button
            as="button"
            styleType="primary"
            onClick={props.ctaFunction}
            disabled={props.disabled}
          >
            {props.ctaTitle}
          </Button>
        </div>
      )}
    </BottomSheet>
  );
};

export default BotttomDrawer;
