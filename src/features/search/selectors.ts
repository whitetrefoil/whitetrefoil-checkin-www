import { createSelector } from 'reselect'
import type { RS }        from '~/hooks/use-root-selector'
import type { State }     from './reducer'

export const $searchBy: RS<string|nil> = s => s.search.searchBy

export const $venues: RS<State['venues']> = s => s.search.venues

export const $venueItems = createSelector($venues, v => v.data)
export const $venueLoading = createSelector($venues, v => v.loading)
export const $venueFailed = createSelector($venues, v => v.loadError)
