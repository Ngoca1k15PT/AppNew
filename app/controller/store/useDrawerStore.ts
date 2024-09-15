import {create} from 'zustand';

interface IDrawerStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useDrawerStore = create<IDrawerStore>(set => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {
    set(() => ({isOpen}));
  },
}));