import { User } from '../../entities/User';
import { httpClient } from '../httpClient';

type UserResponse = { data: User };

export const updatePhone = async (userId: string, updatedPhone: string) => {
  const { data } = await httpClient.patch<UserResponse>(
    `/users/${userId}/phone`,
    {
      phone: updatedPhone,
    },
  );

  return data.data;
};
