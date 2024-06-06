import { me } from './me';
import { recoveryPasswordEmail } from './recoveryPasswordEmail';
import { updateImage } from './updateImage';
import { updateName } from './updateName';
import { updatePassword } from './updatePassword';
import { updatePasswordWithToken } from './updatePasswordWithToken';
import { updatePhone } from './updatePhone';

export const userService = {
  me,
  updateName,
  updatePhone,
  recoveryPasswordEmail,
  updatePasswordWithToken,
  updatePassword,
  updateImage,
};
