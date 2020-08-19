import { createSelector } from 'reselect'
import { RS }             from '~/hooks/use-root-selector'


export const $history: RS<Record<string, number>> = s => s.history

export const $$historyByVenueId = (id: string): RS<number> => createSelector(
  $history,
  history => history[id],
)
