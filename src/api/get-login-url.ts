import { get } from './base'

export interface GetLoginUrlResponse {
  url: string
};

export const getLoginUrl = async(): Promise<GetLoginUrlResponse> => get('login')
