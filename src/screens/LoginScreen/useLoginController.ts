import { useNavigation } from '@react-navigation/native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signin } from '../../services/authService/signin';
import { useAuth } from '../../hooks/useAuth';
import Toast from 'react-native-toast-message';

type FormData = z.infer<typeof schema>;

const schema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório.')
    .email('Digite um e-mail válido.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
});

export const useLoginController = () => {
  const { navigate } = useNavigation<any>();
  const { login } = useAuth();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      const { userId, accessToken } = await signin(data);
      login(userId, accessToken);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Email ou senha inválido',
        swipeable: true,
        visibilityTime: 1800,
      });
    }
  };

  return {
    navigate,
    control,
    errors,
    handleSubmit,
    setValue,
    onSubmit,
  };
};
