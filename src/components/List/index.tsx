import { useEffect, useState } from 'preact/hooks';
import React, { FC, memo }     from 'react';
import { getVenues }           from '../../api/get-venues';
import { Venue }               from '../../interfaces/venue';
import ListItem                from './ListItem';
// import * as css from './index.scss';


const List: FC<{
  token: string;
  onAuthError(): unknown;
}> = ({
  token,
  onAuthError,
}) => {

  const [venues, setVenues] = useState<Venue[]|null>(null);

  useEffect(() => {
    getVenues(token).then(({ venues }) => setVenues(venues));
  }, [token]);

  if (venues == null) {
    return null;
  }

  const items = venues.map(v => <ListItem
    key={v.id}
    venue={v}
  />);

  return (
    <div>
      <ul>{items}</ul>
    </div>
  );
};


export default memo(List);
