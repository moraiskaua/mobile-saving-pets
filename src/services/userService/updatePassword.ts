import { User } from '../../entities/User';
import { httpClient } from '../httpClient';

export type updatePasswordDto = {
  oldPassword: string;
  newPassword: string;
};

type UserResponse = { data: User };

export const updatePassword = async (
  userId: string,
  { oldPassword, newPassword }: updatePasswordDto,
) => {
  const { data } = await httpClient.patch<UserResponse>(`/users/${userId}`, {
    oldPassword,
    newPassword,
  });

  return data.data;
};
