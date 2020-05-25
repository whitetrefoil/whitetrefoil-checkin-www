import { User } from '~/interfaces/user';
import { post } from './base';


interface RawRes {
  token: string;
  user: {
    id: string;
    // eslint-disable-next-line camelcase
    first_name: string;
    // eslint-disable-next-line camelcase
    last_name: string;
    photo: {
      prefix: string;
      suffix: string;
    };
  };
}

export interface CheckLoginResponse {
  token: string;
  user: User;
}

export const checkLogin = async(code: string): Promise<CheckLoginResponse> => {
  return post<RawRes>('login', {
    json: { code },
  }).then(res => ({
    token: res.token,
    user : {
      id       : res.user.id,
      firstName: res.user.first_name,
      lastName : res.user.last_name,
      photo    : [res.user.photo.prefix, res.user.photo.suffix],
    },
  }));
};
