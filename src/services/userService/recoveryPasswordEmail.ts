import { httpClient } from '../httpClient';

export type updatePasswordDto = {
  email: string;
};

export const recoveryPasswordEmail = async ({ email }: updatePasswordDto) => {
  await httpClient.post(`/users/recoveryPasswordEmail`, {
    email,
  });
};
