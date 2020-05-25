import { Checkin } from '~/interfaces/checkin';
import { Geo }     from '~/interfaces/geo';
import { post }    from './base';


interface RawRes {
  // eslint-disable-next-line camelcase
  is_mayor: boolean;
  score: number;
  url: string;
  reasons: {
    icon: string;
    message: string;
    points: string;
  };
}

export type AddCheckinResponse = Checkin;


export const addCheckin = async(
  token: string,
  venueId: string,
  geo: Geo,
  shout?: string,
): Promise<AddCheckinResponse> => {
  return post<RawRes>('checkin', {
    headers: {
      'x-token': token,
    },
    json   : {
      // eslint-disable-next-line camelcase
      venue_id: venueId,
      latitude: geo[0],
      longitude: geo[1],
      accuracy: geo[3],
      altitude: geo[2],
      shout,
    },
  }).then(res => ({
    isMayor: res.is_mayor,
    score  : res.score,
    url    : res.url,
    reasons: res.reasons,
  }));
};
