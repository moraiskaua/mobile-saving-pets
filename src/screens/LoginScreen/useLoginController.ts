import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
  const { login } = useContext(AuthContext);

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

  const onSubmit: SubmitHandler<FormData> = data => {
    login(data);
  };

  return {
    navigate,
    control,
    errors,
    login,
    handleSubmit,
    setValue,
    onSubmit,
  };
};
