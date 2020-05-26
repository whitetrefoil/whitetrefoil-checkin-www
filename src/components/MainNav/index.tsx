import { prevented }       from '@whitetrefoil/jsx-sp-events/react';
import React, { FC, memo } from 'react';
import { User }            from '~/interfaces/user';
import Avatar              from './Avatar';
import * as css            from './index.scss';


const MainNav: FC<{
  user: User|null;
}> = ({
  user,
}) => (
  <nav className={css.root}>
    <a href="#" className={css.title} onClick={prevented}>Click to Check-in</a>
    <Avatar user={user}/>
  </nav>
);


export default memo(MainNav);
