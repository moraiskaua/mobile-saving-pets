import { User } from '../../entities/User';
import { httpClient } from '../httpClient';

type UserResponse = { data: User };

export const updateImage = async (userId: string, image: string) => {
  const { data } = await httpClient.patch<UserResponse>(
    `/users/${userId}/image`,
    {
      image,
    },
  );

  return data.data;
};
