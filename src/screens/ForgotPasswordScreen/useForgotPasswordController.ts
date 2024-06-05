import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { userService } from '../../services/userService';

type FormData = z.infer<typeof schema>;

const schema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório.')
    .email('Digite um e-mail válido.'),
});

export const useForgotPasswordController = () => {
  const { goBack, navigate } = useNavigation<any>();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async data => {
    // await userService.recoveryPasswordEmail(data);

    navigate('ChangePassword');
  };

  return {
    goBack,
    control,
    errors,
    handleSubmit,
    onSubmit,
    setValue,
  };
};
