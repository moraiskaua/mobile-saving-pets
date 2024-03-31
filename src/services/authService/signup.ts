import { httpClient } from '../httpClient';

export interface SignupParams {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
}

interface SignupResponse {
  data: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    createdAt: Date;
  };
}

export const signup = async (params: SignupParams) => {
  const { data } = await httpClient.post<SignupResponse>('/users', params);

  return data;
};
