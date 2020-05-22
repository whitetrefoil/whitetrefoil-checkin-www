import getLogger   from '@whitetrefoil/log-utils';
import { useMemo } from 'react';


interface InStorage {
  t?: string;
  h?: Record<string, Record<string, number>>;
}


const { debug, warn } = getLogger(`/src/${__filename.split('?')[0]}`);


export const useInStorage = (): InStorage => useMemo(() => {
  const inStorage: InStorage = {};
  const inStorageJson: string|null = window.localStorage.getItem('whitetrefoil-checkin-temp');
  if (inStorageJson != null && inStorageJson !== '') {
    try {
      const parsed: InStorage|null|undefined = JSON.parse(atob(inStorageJson));
      inStorage.t = parsed?.t;
      inStorage.h = parsed?.h;
    } catch (e) {
      warn('Failed to parse cache in localStorage, will reset.  Reason:', e);
      window.localStorage.removeItem('whitetrefoil-checkin-temp');
    }
  }
  return inStorage;
}, []);


export const useUpdateStorage = () => (val: InStorage) => {
  debug('Update Storage:', val);
  window.localStorage.setItem('whitetrefoil-checkin-temp', btoa(JSON.stringify(val)));
};
