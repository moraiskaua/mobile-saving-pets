import { User } from '../../entities/User';
import { httpClient } from '../httpClient';

type UserResponse = { data: User };

export const updateName = async (userId: string, updatedName: string) => {
  const { data } = await httpClient.put<UserResponse>(`/users/${userId}`, {
    name: updatedName,
  });

  return data.data;
};
