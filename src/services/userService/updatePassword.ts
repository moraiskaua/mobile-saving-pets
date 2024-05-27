import { User } from '../../entities/User';
import { httpClient } from '../httpClient';

export type updatePasswordDto = {
  password: string;
  oldPassword: string;
};

type UserResponse = { data: User };

export const updatePassword = async (
  userId: string,
  { password, oldPassword }: updatePasswordDto,
) => {
  const { data } = await httpClient.patch<UserResponse>(`/users/${userId}`, {
    password,
    oldPassword,
  });

  return data.data;
};
