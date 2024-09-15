import {MMKV} from 'react-native-mmkv';
export enum STORAGE_KEYS {
  TOKEN = '@@TOKEN',
}
export const storage = new MMKV();

export const clearStorage = (excludeKey: string[] = []) => {
  const keys = storage.getAllKeys();
  keys.forEach(key => {
    if (!excludeKey.includes(key)) {
      storage.delete(key);
    }
  });
};