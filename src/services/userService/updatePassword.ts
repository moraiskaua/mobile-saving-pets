import { User } from '../../entities/User';
import { httpClient } from '../httpClient';

export type updatePasswordDto = {
  email: string;
  password: string;
  oldPassword: string;
};

type UserResponse = { data: User };

export const updatePassword = async ({
  email,
  password,
  oldPassword,
}: updatePasswordDto) => {
  const { data } = await httpClient.patch<UserResponse>(`/users`, {
    email,
    password,
    oldPassword,
  });

  return data.data;
};
