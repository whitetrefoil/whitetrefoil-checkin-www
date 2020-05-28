import { useEffect, useMemo }      from 'preact/hooks';
import React, { FC, memo }         from 'react';
import { useDispatch }             from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import Login                       from './components/Login';
import ListFeature                 from './features/list';
import { useRS }                   from './hooks/use-root-selector';
import { FETCH_USER }              from './store/session/actions';
import { $token, $user }           from './store/session/selectors';

// import * as css from './index.scss';


const App: FC = () => {

  const dispatch = useDispatch();
  const token = useRS($token);
  const user = useRS($user);

  // onLogin.
  useEffect(() => {
    if (token == null) {
      // No auth,
      return;
    }
    if (user == null) {
      // Got token from localStorage, but no user.
      dispatch(FETCH_USER.request());
      return;
    }
    // FIXME
    // Got both token & user.
    // window.location.assign(process.env.BASE_URL ?? '/');
  }, [dispatch, token, user]);

  const contentElem = useMemo(
    () => token == null ? <Login/> :
      <Switch>
        <Route path="/" exact component={ListFeature}/>
        {/*<Route path="/search" exact component={SearchFeature}/>*/}
        <Redirect to="/"/>
      </Switch>
    ,
    [token],
  );

  return (
    <div id="app">
      {contentElem}
    </div>
  );
};


export default memo(App);
