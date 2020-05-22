import omit                               from 'object.omit';
import { useCallback, useMemo, useState } from 'preact/hooks';
import React, { FC, memo }                from 'react';
import List                               from './components/List';
import Login                              from './components/Login';
import { useInStorage, useUpdateStorage } from './hooks/in-storage';

// import * as css from './index.scss';


const App: FC = () => {

  const inStorage = useInStorage();
  const updateStorage = useUpdateStorage();
  const [token, setToken] = useState<string|null>(inStorage.t ?? null);
  const [history, setHistory] = useState<Record<string, number>|null>(null);

  const onLogin = useCallback((t: string) => {
    updateStorage({ ...inStorage, t });
    setToken(t);
    window.location.assign(process.env.BASE_URL ?? '/');
  }, [inStorage, updateStorage]);

  const onAuthError = useCallback(() => {
    updateStorage(omit(inStorage, 't'));
    setToken(null);
  }, [inStorage, updateStorage]);

  const contentElem = useMemo(
    () => token == null
      ? <Login onLogin={onLogin}/>
      : <List
        token={token}
        onAuthError={onAuthError}
      />
    ,
    [onAuthError, onLogin, token],
  );

  return (
    <div id="app">{contentElem}</div>
  );
};


export default memo(App);
