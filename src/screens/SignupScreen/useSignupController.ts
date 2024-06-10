import { useNavigation } from '@react-navigation/native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signup } from '../../services/authService/signup';
import Toast from 'react-native-toast-message';

type FormData = z.infer<typeof schema>;

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório.'),
  email: z
    .string()
    .min(1, 'E-mail é obrigatório.')
    .email('Digite um e-mail válido.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
  cpf: z.string().min(1, 'Cpf é obrigatório.'),
  phone: z.string().min(1, 'Celular é obrigatório.'),
});

export const useSignupController = () => {
  const { goBack, navigate } = useNavigation<any>();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      cpf: '',
      phone: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      await signup(data);
      navigate('Login');
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Algo deu errado.',
        swipeable: true,
        visibilityTime: 1800,
      });
    }
  };

  return {
    goBack,
    control,
    errors,
    handleSubmit,
    setValue,
    onSubmit,
  };
};
