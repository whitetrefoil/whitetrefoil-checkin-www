import { User } from '~/interfaces/user';
import { get }  from './base';


interface RawRes {
  id: string;
  // eslint-disable-next-line camelcase
  first_name: string;
  // eslint-disable-next-line camelcase
  last_name: string;
  photo: {
    prefix: string;
    suffix: string;
  };
}

export type GetUserDetailResponse = User;

export const getUserDetail = async(token: string): Promise<GetUserDetailResponse> => {
  return get<RawRes>('users', {
    headers: {
      'x-token': token,
    },
  }).then(user => ({
    id       : user.id,
    firstName: user.first_name,
    lastName : user.last_name,
    photo    : [user.photo.prefix, user.photo.suffix],
  }));
};
