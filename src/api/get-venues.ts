import { Geo }   from '~/interfaces/geo';
import { Venue } from '~/interfaces/venue';
import { get }   from './base';

export interface GetVenuesResponse {
  venues: Venue[];
}

export const getVenues = async(token: string, geo: Geo, name?: string): Promise<GetVenuesResponse> => {
  return get<Venue[]>('venues', {
    headers     : {
      'x-token': token,
    },
    searchParams: {
      name     : name ?? '',
      latitude : geo[0],
      longitude: geo[1],
      altitude : geo[2],
      accuracy : geo[3],
    },
  }).then(venues => ({
    venues,
  }));
};
