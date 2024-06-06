import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { userService } from '../../services/userService';

type FormData = z.infer<typeof schema>;

const schema = z.object({
  token: z.string().min(1, 'Código é obrigatório.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
});

export const useChangePasswordController = (email: string) => {
  const { goBack, navigate } = useNavigation<any>();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      token: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async data => {
    await userService.updatePasswordWithToken({ ...data, email });

    navigate('Login');
  };
  return { goBack, control, errors, handleSubmit, onSubmit, setValue };
};
