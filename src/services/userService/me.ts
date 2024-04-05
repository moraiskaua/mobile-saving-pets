import { User } from '../../entities/User';
import { httpClient } from '../httpClient';

type MeResponse = { data: User };

export const me = async (userId: string) => {
  const { data } = await httpClient.get<MeResponse>(`/users/${userId}`);

  return data.data;
};
