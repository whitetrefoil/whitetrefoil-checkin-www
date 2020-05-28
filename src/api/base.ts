import ky, { Options } from 'ky';
import rootStore       from '../store';


interface RawResponse<T> {
  code: number;
  data: T|string;
}


export class ApiError extends Error {
  constructor(public code: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}


const api = ky.create({
  prefixUrl      : '/api',
  headers        : {
    'content-type': 'application/json',
  },
  hooks          : {
    beforeRequest: [
      request => {
        const { token } = rootStore.getState().session;
        if (token != null) {
          request.headers.set('x-token', token);
        }
      },
    ],
  },
  timeout        : 5000,
  retry          : 0,
  cache          : 'no-cache',
  throwHttpErrors: false,
});


export const get = async <RES = unknown>(url: string, options?: Options): Promise<RES> => {
  const res = await api.get(url, options);
  if (res == null) {
    throw new Error('network error');
  }
  const json: RawResponse<RES> = await res.json();
  if (!res.ok || json.code == null || json.code > 299) {
    throw new ApiError(res.status, json.data as string || res.statusText);
  }
  return json.data as RES;
};

export const post = async <RES = unknown>(url: string, options?: Options): Promise<RES> => {
  const res = await api.post(url, options);
  if (res == null) {
    throw new Error('network error');
  }
  const json: RawResponse<RES> = await res.json();
  if (!res.ok || json.code == null || json.code > 299) {
    throw new ApiError(res.status, json.data as string || res.statusText);
  }
  return json.data as RES;
};
