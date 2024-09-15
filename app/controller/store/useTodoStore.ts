import dayjs from 'dayjs';
import {create} from 'zustand';

interface ITodoStore {
  date: string;
  setDate: (date: string) => void;
}

export const useTodoStore = create<ITodoStore>(set => ({
  date: dayjs(new Date()).format('DD-MM-YYYY'),
  setDate: (date: string) => {
    set(() => ({date}));
  },
}));