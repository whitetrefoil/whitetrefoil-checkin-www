import { prevented }             from '@whitetrefoil/jsx-sp-events'
import { useState }              from 'preact/hooks'
import type { FC }               from 'react'
import React, { memo }           from 'react'
import { Redirect, useLocation } from 'react-router'
import css                       from './index.scss'


const Fib: FC = () => {

  const { pathname } = useLocation()
  const [isGotoSearch, goToSearch] = useState(false)

  const onSearch = () => goToSearch(true)

  if (pathname === '/search') {
    return null
  }

  if (isGotoSearch) {
    goToSearch(false)
    return <Redirect push to="/search"/>
  }

  return (
    <a href="#" className={css.root} onClick={prevented(onSearch)}>Search</a>
  )
}


export default memo(Fib)
