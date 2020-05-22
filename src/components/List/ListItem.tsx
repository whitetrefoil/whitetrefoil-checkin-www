import React, { FC, memo } from 'react';
import { Venue }           from '~/interfaces/venue';
import * as css            from './index.scss';


const ListItem: FC<{
  venue: Venue;
}> = ({
  venue,
}) => {

  return (
    <li className={css.item}>
      <section>
        <header className={css.title}>
          <h3 className={css.name}>{venue.name}</h3>
          <div className={css.lastCheckin}>1d</div>
        </header>

        <div className={css.location}>
          <div className={css.distance}>{venue.distance}m</div>
          <address className={css.address}>{venue.address}</address>
        </div>
      </section>
    </li>
  );
};


export default memo(ListItem);
