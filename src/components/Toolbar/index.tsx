import { prevented }                 from '@whitetrefoil/jsx-sp-events'
import { useLayoutEffect, useState } from 'preact/hooks'
import type { FC }                   from 'react'
import React, { memo }               from 'react'
import { Redirect }                  from 'react-router'
import css                           from './index.scss'


const Toolbar: FC = () => {

  const [isGotoSearch, goToSearch] = useState(false)

  useLayoutEffect(() => {
    window.document.body.classList.add(css.hasToolbar)
    return () => window.document.body.classList.remove(css.hasToolbar)
  }, [])

  const onBackClick = () => {
    if (window.history.length <= 1) {
      window.close()
    } else {
      window.history.back()
    }
  }

  const onSearch = () => goToSearch(true)

  if (isGotoSearch) {
    goToSearch(false)
    return <Redirect push to="/search"/>
  }

  return (
    <div className={css.root}>
      <a href="#" className={css.back} onClick={prevented(onBackClick)}>Back</a>
      <a href="#" className={css.search} onClick={prevented(onSearch)}>Search</a>
    </div>
  )
}


export default memo(Toolbar)
