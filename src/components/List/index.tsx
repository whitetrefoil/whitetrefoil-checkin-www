import { useCallback, useEffect, useState } from 'preact/hooks';
import React, { FC, memo }                  from 'react';
import { addCheckin }                       from '~/api/add-checkin';
import { getVenues }                        from '~/api/get-venues';
import { Checkin }                          from '~/interfaces/checkin';
import { Geo }                              from '~/interfaces/geo';
import { Venue }                            from '~/interfaces/venue';
import * as css                             from './index.scss';
import ListItem                             from './ListItem';


const List: FC<{
  token: string;
  history: Record<string, number>|null;
  onNewHistory(venueId: string): unknown;
  onAuthError(): unknown;
}> = ({
  token,
  history,
  onNewHistory,
  onAuthError,
}) => {

  const [geo, setGeo] = useState<Geo|null>(null);
  const [venues, setVenues] = useState<Venue[]|null>(null);
  const [, setCheckin] = useState<Record<string, Checkin>>({});

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(gp => {
      setGeo([gp.coords.latitude, gp.coords.longitude, gp.coords.altitude ?? 0, gp.coords.accuracy]);
    }, undefined, {
      enableHighAccuracy: false,
    });
  }, []);

  useEffect(() => {
    if (geo == null) {
      return;
    }
    getVenues(token, geo).then(({ venues: v }) => setVenues(v));
  }, [geo, token]);

  const onItemClick = useCallback(async(venue: Venue, shout?: string): Promise<number> => {
    if (geo == null) {
      return new Promise((res, rej) => rej(new Error('shouldn\'t reach')));
    }
    const result = await addCheckin(token, venue.id, geo);
    setCheckin(orig => ({
      ...orig,
      [venue.id]: result,
    }));
    onNewHistory(venue.id);
    return result.score;
  }, [geo, onNewHistory]);

  if (geo == null) {
    return <div className={css.message}>Requiring GPS location&hellip;</div>;
  }

  if (venues == null) {
    return <div className={css.message}>Requiring nearby venues&hellip;</div>;
  }

  if (history == null) {
    return <div className={css.message}>Requiring user info</div>;
  }

  const items = venues.map(v => <ListItem
    key={v.id}
    venue={v}
    lastCheckin={history?.[v.id] ?? null}
    onClick={onItemClick}
  />);

  return (
    <div>
      <ul>{items}</ul>
    </div>
  );
};


export default memo(List);
