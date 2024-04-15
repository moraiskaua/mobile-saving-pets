import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { useMe } from '../../helpers/useMe';

type FormData = z.infer<typeof schema>;

const schema = z.object({
  image: z.string().min(1, 'Imagem é obrigatória.'),
  name: z.string().min(1, 'Nome é obrigatório.'),
  phone: z.string().min(1, 'Celular é obrigatório.'),
  password: z.string().min(8, 'Mínimo 8 caracteres.'),
  newPassword: z.string().min(8, 'Mínimo 8 caracteres.'),
});

export const useSettingsController = () => {
  const [editionMode, setEditionMode] = useState<boolean>(false);
  const { userId } = useAuth();
  const { user } = useMe(userId);
  console.log(user);

  const toggleEditionMode = () => setEditionMode(!editionMode);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      image: user?.image,
      name: user?.name,
      phone: user?.phone,
      password: '',
      newPassword: '',
    },
  });

  const { logout } = useAuth();

  const onSubmit: SubmitHandler<FormData> = async data => {
    console.log(data);
  };

  return {
    user,
    editionMode,
    control,
    errors,
    setValue,
    logout,
    toggleEditionMode,
    handleSubmit,
    onSubmit,
  };
};
