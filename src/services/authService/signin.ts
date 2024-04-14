import { httpClient } from '../httpClient';

export interface SigninParams {
  email: string;
  password: string;
}

interface SigninResponse {
  userId: string;
  accessToken: string;
}

export const signin = async (params: SigninParams) => {
  const { data } = await httpClient.post<SigninResponse>(
    '/users/login',
    params,
  );

  return data;
};
