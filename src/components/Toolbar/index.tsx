import { prevented }                       from '@whitetrefoil/jsx-sp-events'
import type { FC }                         from 'react'
import { memo, useLayoutEffect, useState } from 'react'
import { Redirect }                        from 'react-router'
import css                                 from './index.scss'


const Toolbar: FC = () => {

  const [isGotoSearch, goToSearch] = useState(false)

  useLayoutEffect(() => {
    const { hasToolbar } = css
    if (hasToolbar != null) {
      window.document.body.classList.add(hasToolbar)
      return () => {
        window.document.body.classList.remove(hasToolbar)
      }
    }
    return undefined
  }, [])

  const onBackClick = () => {
    if (window.history.length <= 1) {
      window.close()
    } else {
      window.history.back()
    }
  }

  const onSearch = () => {
    goToSearch(true)
  }

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
