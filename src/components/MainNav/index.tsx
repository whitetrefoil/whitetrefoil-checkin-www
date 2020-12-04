import { prevented }  from '@whitetrefoil/jsx-sp-events'
import type { FC }    from 'react'
import { memo }       from 'react'
import type { ValOf } from '~/hooks/use-val'
import type { User }  from '~/interfaces/user'
import Avatar         from './Avatar'
import css            from './index.scss'


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
