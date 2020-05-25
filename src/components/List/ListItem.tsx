import c                                  from 'classnames';
import { useCallback, useMemo, useState } from 'preact/hooks';
import React, { FC, memo }                from 'react';
import { Venue }                          from '~/interfaces/venue';
import * as css                           from './index.scss';
import LastCheckin                        from './LastCheckin';


const ListItem: FC<{
  venue: Venue;
  lastCheckin: number|null;
  onClick(venue: Venue): Promise<number>;
}> = ({
  venue,
  lastCheckin,
  onClick: oc,
}) => {

  // null - initial
  // 0 - checking-in
  // <0 - error
  // >0 - score
  const [status, setStatus] = useState<number|null>(null);

  const onClick = useCallback(() => {
    if ((status ?? -1) >= 0) {
      return;
    }
    setStatus(0);
    oc(venue)
      .then(score => {
        setStatus(score);
      }, () => {
        setStatus(-Infinity);
      });
  }, [oc, status, venue]);

  const klasses = useMemo(() => c(css.item, status == null ? undefined :
    status === 0 ? css.loading :
      status < 0 ? css.failed :
        status > 0 ? css.success :
          undefined,
  ), [status]);

  return (
    <li className={klasses} onClick={onClick}>
      <section>
        <header className={css.title}>
          <h3 className={css.name}>
            <span className={css.success}>+{status}︎</span>
            <span className={css.failed}>FAILED</span>
            <span className={css.mayor}>👑</span>
            {venue.name}
          </h3>
          {lastCheckin && <LastCheckin ms={lastCheckin}/>}
        </header>

        <div className={css.location}>
          <div className={css.distance}>{venue.distance}m</div>
          <address className={css.address}>{venue.address}</address>
        </div>
      </section>

      <div className={css.loadingBg}/>
    </li>
  );
};


export default memo(ListItem);
