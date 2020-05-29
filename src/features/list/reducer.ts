import omit                          from 'object.omit';
import { ActionType, createReducer } from 'typesafe-actions';
import { Venue }                     from '~/interfaces/venue';
import * as A                        from './actions';


type Action = ActionType<typeof A>;


export interface State {
  venues: Loadable<Venue[]>;
}


const init = (): State => ({
  venues: {},
});


export default createReducer<State, Action>(init())

  .handleAction(A.RESET, () => init())

  .handleAction(A.FETCH_VENUES.request, s => ({
    ...s,
    venues: {
      ...omit(s.venues, 'loadError'),
      loading: true,
    },
  }))

  .handleAction(A.FETCH_VENUES.success, (s, { payload: data }) => ({
    ...s,
    venues: {
      ...omit(s.venues, ['loading', 'loadError']),
      data,
    },
  }))

  .handleAction(A.FETCH_VENUES.failure, (s, { payload: loadError }) => ({
    ...s,
    venues: {
      ...omit(s.venues, ['loading', 'data']),
      loadError,
    },
  }))
;
