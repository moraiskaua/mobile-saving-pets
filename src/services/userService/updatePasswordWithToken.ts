import { httpClient } from '../httpClient';

export type updatePasswordWithTokenDto = {
  email: string;
  password: string;
  token: string;
};

export const updatePasswordWithToken = async ({
  email,
  password,
  token,
}: updatePasswordWithTokenDto) => {
  await httpClient.patch(`/users`, {
    email,
    password,
    token,
  });
};
