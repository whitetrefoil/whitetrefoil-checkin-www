import { createSelector } from 'reselect';
import type { RS }        from '~/hooks/use-root-selector';
import type { State }     from './reducer';

export const $venues: RS<State['venues']> = s => s.list.venues;

export const $venueItems = createSelector($venues, v => v.data);
export const $venueLoading = createSelector($venues, v => v.loading);
export const $venueFailed = createSelector($venues, v => v.loadError);

export const $checkins: RS<State['checkins']> = s => s.list.checkins;
export const $$checkinById = (id: string) => createSelector($checkins, checkins => checkins[id]);

export const $isGotoSearch: RS<boolean> = s => s.list.gotoSearch ?? false;
