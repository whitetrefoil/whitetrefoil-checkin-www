import c                        from 'classnames';
import { useCallback, useMemo } from 'preact/hooks';
import React, { FC, memo }      from 'react';
import { useVal, ValOf }        from '~/hooks/use-val';
import { Checkin }              from '~/interfaces/checkin';
import { Venue }                from '~/interfaces/venue';
import * as css                 from './index.scss';
import LastCheckin              from './LastCheckin';


const ListItem: FC<{
  venue: Venue;
  lastCheckin: number|null;
  $checkinStatus: ValOf<Saveable<Checkin>|nil>;
  onClick(venue: Venue): unknown;
}> = ({
  venue,
  lastCheckin,
  $checkinStatus,
  onClick: oc,
}) => {

  const { data: status, saving, saveError } = useVal($checkinStatus) ?? { data: undefined };

  const onClick = useCallback(() => {
    if (status != null || saving) {
      return;
    }
    oc(venue);
  }, [oc, saving, status, venue]);

  const klasses = useMemo(() => c(
    css.item,
    saving ? css.loading :
      saveError != null ? css.failed :
        status != null ? css.success :
          undefined,
    {
      [css.isMayor]: status != null && status.isMayor,
    },
  ), [saveError, saving, status]);

  return (
    <li className={klasses} onClick={onClick}>
      <section>
        <header className={css.title}>
          <h3 className={css.name}>
            <span className={css.success}>+{status?.score}︎</span>
            <span className={css.failed}/>
            <span className={css.mayor}/>
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
