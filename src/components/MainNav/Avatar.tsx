import { useMemo }         from 'preact/hooks';
import React, { FC, memo } from 'react';
import { useVal, ValOf }   from '~/hooks/use-val';
import { User }            from '~/interfaces/user';
import * as css            from './index.scss';


const Avatar: FC<{
  $user: ValOf<User|undefined>;
}> = ({
  $user,
}) => {

  const user = useVal($user);

  const img = useMemo(() => user == null ? '?' : <img
    alt={`${user.firstName}'s avatar`}
    src={`${user.photo[0]}100x100${user.photo[1]}`}
  />, [user]);

  return (
    <div className={css.avatar}>
      {img}
    </div>
  );
};


export default memo(Avatar);
