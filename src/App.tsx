import type { FC }                  from 'react'
import { memo, useEffect, useMemo } from 'react'
import { useDispatch }              from 'react-redux'
import { Redirect, Route, Switch }  from 'react-router'
import Fib                          from './components/Fib'
import Login                        from './components/Login'
import Toolbar                      from './components/Toolbar/index'
import ListFeature                  from './features/list'
import SearchFeature                from './features/search/index'
import { useRS }                    from './hooks/use-root-selector'
import { FETCH_USER }               from './store/session/actions'
import { $token, $user }            from './store/session/selectors'

// import css from './index.scss';


const App: FC = () => {

  const dispatch = useDispatch()
  const token = useRS($token)
  const user = useRS($user)

  // onLogin.
  useEffect(() => {
    if (token == null) {
      // No auth,
      return
    }
    if (user == null) {
      // Got token from localStorage, but no user.
      dispatch(FETCH_USER.request())

    }
    // FIXME
    // Got both token & user.
    // window.location.assign(process.env.BASE_URL ?? '/');
  }, [dispatch, token, user])

  const contentElem = useMemo(
    () => token == null ? <Login/> :
      <Switch>
        <Route path="/" exact component={ListFeature}/>
        <Route path="/search" exact component={SearchFeature}/>
        <Redirect to="/"/>
      </Switch>
    ,
    [token],
  )

  const isFullscreen = process.env.NODE_ENV === 'development' || window.matchMedia('(display-mode: fullscreen)').matches

  const actionArea = isFullscreen ? <Toolbar/> : <Fib/>

  return (
    <div id="app">
      {contentElem}
      {actionArea}
    </div>
  )
}


export default memo(App)
