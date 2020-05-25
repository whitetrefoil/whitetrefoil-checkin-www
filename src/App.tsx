import omit                                          from 'object.omit';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import React, { FC, memo }                           from 'react';
import { ApiError }                                  from './api/base';
import { getUserDetail }                             from './api/get-user.detail';
import List                                          from './components/List';
import Login                                         from './components/Login';
import MainNav                                       from './components/MainNav';
import { User }                                      from './interfaces/user';
import { getInStorage, updateStorage }               from './utils/in-storage';

// import * as css from './index.scss';


const App: FC = () => {

  const inStorage = getInStorage();
  const [token, setToken] = useState<string|null>(inStorage.t ?? null);
  const [user, setUser] = useState<User|null>(null);
  const [history, setHistory] = useState<Record<string, number>|null>(null);

  // Init history.
  useEffect(() => {
    if (user == null) {
      return;
    }
    const h = getInStorage().h?.[user.id] ?? {};
    setHistory(h);
  }, [user]);

  const onLogin = useCallback((t: string, u: User) => {
    updateStorage(prev => ({ ...prev, t }));
    setToken(t);
    setUser(u);
    window.location.assign(process.env.BASE_URL ?? '/');
  }, []);

  const onAuthError = useCallback(() => {
    updateStorage(prev => omit(prev, 't'));
    setToken(null);
  }, []);

  // Init user info if token from localStorage.
  useEffect(() => {
    if (token == null || user != null) {
      return;
    }
    getUserDetail()
      .then(u => setUser(u))
      .catch(e => {
        if (e instanceof ApiError && e.code === 401) {
          onAuthError();
        }
      });
  }, [onAuthError, token, user]);

  const onNewHistory = useCallback((venueId: string) => {
    if (user == null) {
      return;
    }
    setHistory(prev => ({
      ...prev,
      [venueId]: Date.now(),
    }));
    updateStorage(prev => ({
      ...prev,
      h: {
        ...prev.h,
        [user.id]: {
          ...(prev.h ?? {})[user.id],
          [venueId]: Date.now(),
        },
      },
    }));
  }, [user]);

  const contentElem = useMemo(
    () => token == null
      ? <Login onLogin={onLogin}/>
      : <List
        token={token}
        history={history}
        onNewHistory={onNewHistory}
        onAuthError={onAuthError}
      />
    ,
    [history, onAuthError, onLogin, onNewHistory, token],
  );

  return (
    <div id="app">
      <MainNav user={user}/>
      {contentElem}
    </div>
  );
};


export default memo(App);
