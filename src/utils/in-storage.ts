import getLogger from '@whitetrefoil/log-utils';


interface InStorage {
  t?: string;
  h?: Record<string, Record<string, number>>;
}


const { debug, warn } = getLogger(`/src/${__filename.split('?')[0]}`);


export const getInStorage = (): InStorage => {
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
};


export const updateStorage = (updater: (val: InStorage) => InStorage) => {
  const prev = getInStorage();
  const next = updater(prev);
  debug('Update Storage:', next);
  window.localStorage.setItem('whitetrefoil-checkin-temp', btoa(JSON.stringify(next)));
};
