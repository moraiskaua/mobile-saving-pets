import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { httpClient } from '../../services/httpClient';
import { signup } from '../../services/authService/signup';

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
    await signup(data);
    navigate('Login');
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
