import type { FC }                          from 'react'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch }                      from 'react-redux'
import { getLoginUrl }                      from '~/api/get-login-url'
import { LOGIN }                            from '~/store/session/actions'
// import css from './index.scss';


const Login: FC = () => {

  const dispatch = useDispatch()
  const code = new URLSearchParams(window.location.search).get('code')
  const [loginPage, setLoginPage] = useState<string|null>(null)
  const [error, setError] = useState<string|null>(null)

  useEffect(() => {
    if (code != null && code !== '') {
      dispatch(LOGIN.request(code))
      return
    }
    if (loginPage == null) {
      getLoginUrl().then(
        ({ url }) => setLoginPage(url),
        e => setError(e instanceof Error ? e.message : 'unknown error'),
      )
      return
    }
    window.location.assign(loginPage)
  }, [code, dispatch, loginPage])

  if (error != null) {
    return (
      <div>
        <p>Failed to load login URL, please refresh to retry. Detail:</p>
        <p>{error}</p>
      </div>
    )
  }

  if (code == null || code === '') {
    return (
      <div>Redirecting to 4sq login page...</div>
    )
  }

  return null
}


export default memo(Login)
