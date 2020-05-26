import omit                                          from 'object.omit';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import React, { FC, memo }                           from 'react';
import { ApiError }                                  from './api/base';
import { getUserDetail }                             from './api/get-user.detail';
import Login                                         from './components/Login';
import NonSearch                                     from './components/NonSearch';
import Search                                        from './components/Search';
import { Geo }                                       from './interfaces/geo';
import { User }                                      from './interfaces/user';
import { getInStorage, updateStorage }               from './utils/in-storage';

// import * as css from './index.scss';


const App: FC = () => {

  const inStorage = getInStorage();
  const [token, setToken] = useState<string|null>(inStorage.t ?? null);
  const [user, setUser] = useState<User|null>(null);
  const [history, setHistory] = useState<Record<string, number>|null>(null);
  const [geo, setGeo] = useState<Geo|null>(null);
  const [searching, setSearching] = useState(false);

  // Init Geo
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(gp => {
      setGeo([gp.coords.latitude, gp.coords.longitude, gp.coords.altitude ?? 0, gp.coords.accuracy]);
    }, undefined, {
      enableHighAccuracy: false,
    });
  }, []);

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
    getUserDetail(token)
      .then(u => setUser(u))
      .catch(e => {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
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
    () => token == null ? <Login onLogin={onLogin}/>
      : searching === false ? <NonSearch
          token={token}
          user={user}
          history={history}
          geo={geo}
          onSearch={() => setSearching(true)}
          onNewHistory={onNewHistory}
          onAuthError={onAuthError}
        />
        : <Search
          token={token}
          user={user}
          history={history}
          geo={geo}
          onCancel={() => setSearching(false)}
          onNewHistory={onNewHistory}
          onAuthError={onAuthError}
        />
    ,
    [geo, history, onAuthError, onLogin, onNewHistory, searching, token, user],
  );

  return (
    <div id="app">
      {contentElem}
    </div>
  );
};


export default memo(App);
