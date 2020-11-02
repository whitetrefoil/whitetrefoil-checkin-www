import type { Geo }   from '~/interfaces/geo'
import type { Venue } from '~/interfaces/venue'
import { get }        from './base'

export interface GetVenuesResponse {
  venues: Venue[]
}

export const getVenues = async(geo: Geo, name?: string): Promise<GetVenuesResponse> =>
  get<Venue[]>('venues', {
    searchParams: {
      name     : name ?? '',
      latitude : geo[0],
      longitude: geo[1],
      altitude : geo[2],
      accuracy : geo[3],
    },
  }).then(venues => ({
    venues,
  }))
