import { Venue } from '../interfaces/venue';
import { get }   from './base';

export interface GetVenuesResponse {
  venues: Venue[];
}

export const getVenues = async(token: string): Promise<GetVenuesResponse> => {
  return get<Venue[]>('venues', {
    headers: {
      'x-token': token,
    },
  }).then(venues => ({
    venues,
  }));
};
