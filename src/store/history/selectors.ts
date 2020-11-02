import { createSelector } from 'reselect'
import type { RS }        from '~/hooks/use-root-selector'


export const $history: RS<Record<string, number>> = s => s.history

export const $$historyByVenueId = (id: string): RS<number> => createSelector(
  $history,
  history => history[id],
)
