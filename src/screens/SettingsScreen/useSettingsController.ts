import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { userService } from '../../services/userService';
import { User } from '../../entities/User';

type FormData = z.infer<typeof schema>;

const schema = z.object({
  image: z.string().min(1, 'Imagem é obrigatória.'),
  name: z.string().min(1, 'Nome é obrigatório.'),
  phone: z.string().min(1, 'Celular é obrigatório.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
  newPassword: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
});

export const useSettingsController = () => {
  const [user, setUser] = useState<User>();
  const [editionMode, setEditionMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchLoggedUser = async () => {
      const response = await userService.me(
        '07c03f03-c6d0-411d-ad9e-b26e995b43e7',
      );
      setUser(response);
    };

    fetchLoggedUser();
  }, []);

  const toggleEditionMode = () => setEditionMode(!editionMode);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      image: '',
      name: '',
      phone: '',
      password: '',
      newPassword: '',
    },
  });

  const { logout } = useAuth();

  return {
    user,
    editionMode,
    control,
    errors,
    handleSubmit,
    setValue,
    logout,
    toggleEditionMode,
  };
};
