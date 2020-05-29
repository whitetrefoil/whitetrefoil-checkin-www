import { useEffect }           from 'preact/hooks';
import React, { FC, memo }     from 'react';
import { useDispatch }         from 'react-redux';
import List                    from '~/components/List';
import MainNav                 from '~/components/MainNav';
import { useRS }               from '~/hooks/use-root-selector';
import { useTitle }            from '~/hooks/use-title';
import { Venue }               from '~/interfaces/venue';
import { CHECKIN }             from '~/store/checkin/actions';
import { $$checkinById }       from '~/store/checkin/selectors';
import { GET }                 from '~/store/geo/actions';
import { $geo }                from '~/store/geo/selectors';
import { $history }            from '~/store/history/selectors';
import { AUTH_ERROR }          from '~/store/session/actions';
import { $user }               from '~/store/session/selectors';
import { FETCH_VENUES, RESET } from './actions';
import { $venues }             from './selectors';
// import * as css from './index.scss';


const ListFeature: FC = () => {

  useTitle('Nearest');

  const dispatch = useDispatch();

  const geo = useRS($geo);

  const onAuthError = () => dispatch(AUTH_ERROR());

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

  return (
    <div className="feature">
      <MainNav $user={$user}/>

      <List
        $geo={$geo}
        $history={$history}
        $venues={$venues}
        $$checkinById={$$checkinById}
        onItemClick={onItemClick}
        onAuthError={onAuthError}
      />
    </div>
  );
};


export default memo(ListFeature);
