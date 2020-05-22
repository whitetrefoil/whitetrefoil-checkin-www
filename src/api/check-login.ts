import { post } from './base';

export interface CheckLoginResponse {
  token: string;
}

export const checkLogin = async(code: string): Promise<CheckLoginResponse> => {
  return post('login', {
    json: { code },
  });
};
