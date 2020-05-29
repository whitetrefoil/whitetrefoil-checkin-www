import { createSelector } from 'reselect';
import type { RS }        from '~/hooks/use-root-selector';
import type { State }     from './reducer';

export const $allCheckin: RS<State> = s => s.checkin;
export const $$checkinById = (id: string) => createSelector($allCheckin, allCheckin => allCheckin[id]);
