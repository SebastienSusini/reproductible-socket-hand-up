import { createContext } from 'react';

interface IModalContext {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  childrenName: string;
  openModal: (key: 'wallet' | 'chain') => void;
  closeModal: () => void;
}


export const ModalContext = createContext<IModalContext | undefined>(undefined);
