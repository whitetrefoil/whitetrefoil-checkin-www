import { useEffect }                                 from 'preact/hooks';
import React, { FC, Fragment, memo }                 from 'react';
import { useDispatch }                               from 'react-redux';
import { Redirect }                                  from 'react-router';
import List                                          from '~/components/List';
import MainNav                                       from '~/components/MainNav';
import { useRS }                                     from '~/hooks/use-root-selector';
import { GET }                                       from '~/store/geo/actions';
import { $geo }                                      from '~/store/geo/selectors';
import { $history }                                  from '~/store/history/selectors';
import { AUTH_ERROR }                                from '~/store/session/actions';
import { $user }                                     from '~/store/session/selectors';
import { Venue }                                     from '../../interfaces/venue';
import { CHECKIN, FETCH_VENUES, GOTO_SEARCH, RESET } from './actions';
import SearchButton                                  from './SearchButton';
import { $isGotoSearch, $venues }                    from './selectors';
// import * as css from './index.scss';


const ListFeature: FC = () => {

  const dispatch = useDispatch();

  const geo = useRS($geo);
  const isGotoSearch = useRS($isGotoSearch);

  const onAuthError = () => dispatch(AUTH_ERROR());
  const onSearchClick = () => dispatch(GOTO_SEARCH());

  // Cleanup when leave.
  useEffect(() => () => dispatch(RESET()), [dispatch]);

  // Request Geolocation.
  useEffect(() => {
    dispatch(GET());
  }, [dispatch]);

  // Request nearby venues when geo changes.
  useEffect(() => {
    if (geo == null) {
      return;
    }
    dispatch(FETCH_VENUES.request(geo));
  }, [dispatch, geo]);

  const onItemClick = ({ id }: Venue) => {
    if (geo == null) {
      return;
    }
    dispatch(CHECKIN.request([id, geo]));
  };

  if (isGotoSearch) {
    return <Redirect to="/search"/>;
  }

  return (
    <Fragment>
      <MainNav $user={$user}/>

      <List
        $geo={$geo}
        $history={$history}
        $venues={$venues}
        onItemClick={onItemClick}
        onAuthError={onAuthError}
      />

      <SearchButton onClick={onSearchClick}/>
    </Fragment>
  );
};


export default memo(ListFeature);
