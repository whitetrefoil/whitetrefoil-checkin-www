import type { FC }      from 'react'
import React, { memo }  from 'react'
import type { RS }      from '~/hooks/use-root-selector'
import type { ValOf }   from '~/hooks/use-val'
import { useVal }       from '~/hooks/use-val'
import type { Checkin } from '~/interfaces/checkin'
import type { Geo }     from '~/interfaces/geo'
import type { Venue }   from '~/interfaces/venue'
import css              from './index.scss'
import ListItem         from './ListItem'


const List: FC<{
  $geo: ValOf<Geo|nil>
  $history: ValOf<Record<string, number>|nil>
  $venues: ValOf<Loadable<Venue[]>>
  $$checkinById: (venueId: string) => RS<Saveable<Checkin>|nil>
  onItemClick: (venue: Venue) => unknown
  onAuthError: () => unknown
}> = ({
  $geo,
  $history,
  $venues,
  $$checkinById,
  onItemClick,
  onAuthError,
}) => {

  const geo = useVal($geo)
  const { data: venues, loading, loadError } = useVal($venues)
  const history = useVal($history)


  if (loadError != null) {
    return <div className={css.message}>Failed to acquire nearby venues, please retry!</div>
  }

  if (geo == null) {
    return <div className={css.message}>Acquiring GPS location&hellip;</div>
  }

  if (loading === true) {
    return <div className={css.message}>Acquiring nearby venues&hellip;</div>
  }

  if (history == null) {
    return <div className={css.message}>Acquiring user info</div>
  }

  const items = venues == null ? [] : venues.map(v => <ListItem
    key={v.id}
    venue={v}
    lastCheckin={history?.[v.id] ?? null}
    $checkinStatus={$$checkinById(v.id)}
    onClick={onItemClick}
  />)

  return (
    <div>
      <ul>{items}</ul>
    </div>
  )
}


export default memo(List)
