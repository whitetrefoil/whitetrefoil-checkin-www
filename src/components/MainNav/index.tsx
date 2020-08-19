import { prevented }       from '@whitetrefoil/jsx-sp-events/react'
import React, { FC, memo } from 'react'
import { ValOf }           from '~/hooks/use-val'
import { User }            from '~/interfaces/user'
import Avatar              from './Avatar'
import * as css            from './index.scss'


const MainNav: FC<{
  $user: ValOf<User|undefined>
}> = ({
  $user,
}) => (
  <nav className={css.root}>
    <a href="#" className={css.title} onClick={prevented}>Simple Check-in</a>
    <Avatar $user={$user}/>
  </nav>
)


export default memo(MainNav)
