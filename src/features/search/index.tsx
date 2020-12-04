import type { FC }                      from 'react'
import { memo, useCallback, useEffect } from 'react'
import { useDispatch }                  from 'react-redux'
import List                             from '~/components/List'
import { useRS }                        from '~/hooks/use-root-selector'
import { useTitle }                     from '~/hooks/use-title'
import type { Venue }                   from '~/interfaces/venue'
import { CHECKIN }                      from '~/store/checkin/actions'
import { $$checkinById }                from '~/store/checkin/selectors'
import { GET }                          from '~/store/geo/actions'
import { $geo }                         from '~/store/geo/selectors'
import { $history }                     from '~/store/history/selectors'
import { AUTH_ERROR }                   from '~/store/session/actions'
import { FETCH_VENUES, RESET, SEARCH }  from './actions'
import SearchBar                        from './SearchBar'
import { $searchBy, $venues }           from './selectors'
// import css from './index.scss';


const SearchFeature: FC = () => {

  useTitle('Search')

  const dispatch = useDispatch()

  const geo = useRS($geo)
  const searchBy = useRS($searchBy)

  const onAuthError = () => dispatch(AUTH_ERROR())

  // Cleanup when leave.
  useEffect(() => () => {
    dispatch(RESET())
  }, [dispatch])

  // Request Geolocation.
  useEffect(() => {
    dispatch(GET())
  }, [dispatch])

  // Request nearby venues when geo changes.
  useEffect(() => {
    if (geo == null || searchBy == null) {
      return
    }
    dispatch(FETCH_VENUES.request([searchBy, geo]))
  }, [dispatch, geo, searchBy])


  const onSearch = useCallback((val: string) => dispatch(SEARCH(val)), [dispatch])

  const onItemClick = useCallback(({ id }: Venue) => {
    if (geo == null) {
      return
    }
    dispatch(CHECKIN.request([id, geo]))
  }, [dispatch, geo])

  return (
    <div className="feature">
      <SearchBar onSearch={onSearch}/>

      <List
        $geo={$geo}
        $history={$history}
        $venues={$venues}
        $$checkinById={$$checkinById}
        onItemClick={onItemClick}
        onAuthError={onAuthError}
      />
    </div>
  )
}


export default memo(SearchFeature)
