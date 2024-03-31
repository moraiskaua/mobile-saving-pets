import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';

type FormData = z.infer<typeof schema>;

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
  newPassword: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
  phone: z.string().min(1, 'Celular é obrigatório.'),
});

export const useSettingsController = () => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      password: '',
      newPassword: '',
    },
  });

  const { logout } = useAuth();

  return {
    control,
    errors,
    handleSubmit,
    setValue,
    logout,
  };
};
