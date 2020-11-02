import type { RS }  from '~/hooks/use-root-selector'
import type { Geo } from '~/interfaces/geo'

export const $geo: RS<Geo|null> = s => s.geo
