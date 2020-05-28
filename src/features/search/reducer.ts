import omit                          from 'object.omit';
import { ActionType, createReducer } from 'typesafe-actions';
import { Checkin }                   from '~/interfaces/checkin';
import { Venue }                     from '~/interfaces/venue';
import * as A                        from './actions';


type Action = ActionType<typeof A>;


export interface State {
  searchBy?: string;
  venues: Loadable<Venue[]>;
  checkins: Record<string, Saveable<Checkin>>;
}


const init = (): State => ({
  venues  : {},
  checkins: {},
});


export default createReducer<State, Action>(init())

  .handleAction(A.RESET, () => init())

  .handleAction(A.SEARCH, (s, { payload: searchBy }) => ({
    ...s,
    searchBy,
  }))

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

  .handleAction(A.CHECKIN.request, (s, { payload }) => ({
    ...s,
    checkins: {
      ...s.checkins,
      [payload[0]]: {
        ...omit(s.checkins[payload[0]], 'saveError'),
        saving: true,
      },
    },
  }))

  .handleAction(A.CHECKIN.success, (s, { payload }) => ({
    ...s,
    checkins: {
      ...s.checkins,
      [payload[0]]: {
        ...omit(s.checkins[payload[0]], ['saveError', 'saving']),
        data: payload[1],
      },
    },
  }))

  .handleAction(A.CHECKIN.failure, (s, { payload }) => ({
    ...s,
    checkins: {
      ...s.checkins,
      [payload[0]]: {
        ...omit(s.checkins[payload[0]], ['saving', 'data']),
        saveError: payload[1],
      },
    },
  }))
;