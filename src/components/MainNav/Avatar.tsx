import { useMemo }     from 'preact/hooks'
import type { FC }     from 'react'
import React, { memo } from 'react'
import type { ValOf }  from '~/hooks/use-val'
import { useVal }      from '~/hooks/use-val'
import type { User }   from '~/interfaces/user'
import css             from './index.scss'


const Avatar: FC<{
  $user: ValOf<User|undefined>
}> = ({
  $user,
}) => {

  const user = useVal($user)

  const img = useMemo(() => user == null ? '?' : <img
    alt={`${user.firstName}'s avatar`}
    src={`${user.photo[0]}100x100${user.photo[1]}`}
  />, [user])

  return (
    <div className={css.avatar}>
      {img}
    </div>
  )
}


export default memo(Avatar)
