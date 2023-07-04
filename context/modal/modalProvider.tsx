import { useCallback, useContext, useMemo, useState } from 'react';

import { ModalContext } from './modalContext';

type Props = {
  children: React.ReactNode;
};

export const ModalProvider = ({ children }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [childrenName, setChildrenName] = useState('');

  const openModal = useCallback((name: string) => {
    setModalIsOpen(true);
    setChildrenName(name);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
    setChildrenName('');
  }, []);

  const value = useMemo(
    () => ({
      modalIsOpen,
      setModalIsOpen,
      childrenName,
      openModal,
      closeModal,
    }),
    [modalIsOpen]
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const result = useContext(ModalContext);
  if (!result) {
    throw new Error('useModal must be used within an ModalProvider!');
  }
  return result;
};
