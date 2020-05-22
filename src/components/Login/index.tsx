import React, { FC, memo, useEffect, useState } from 'react';
import { checkLogin }                           from '~/api/check-login';
import { getLoginUrl }                          from '~/api/get-login-url';
// import * as css from './index.scss';


const Login: FC<{
  onLogin(token: string): unknown;
}> = ({
  onLogin,
}) => {

  const code = new URLSearchParams(window.location.search).get('code');
  const [loginPage, setLoginPage] = useState<string|null>(null);
  console.log(code);

  useEffect(() => {
    if (code != null && code !== '') {
      checkLogin(code).then(({ token }) => onLogin(token));
      return;
    }
    if (loginPage == null) {
      getLoginUrl().then(({ url }) => setLoginPage(url));
      return;
    }
    window.location.assign(loginPage);
  }, [code, loginPage, onLogin]);

  if (code == null || code === '') {
    return (
      <div>Redirecting to 4sq login page...</div>
    );
  }

  return null;
};


export default memo(Login);
