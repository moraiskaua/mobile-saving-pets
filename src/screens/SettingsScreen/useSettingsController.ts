import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { useState, useEffect, useCallback } from 'react';
import { useMe } from '../../helpers/useMe';
import { userService } from '../../services/userService';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { FileType } from '../../entities/types/File';
import { env } from '../../constants/env';
import Toast from 'react-native-toast-message';

type FormData = z.infer<typeof schema>;

const schema = z.object({
  image: z.string(),
  name: z.string().min(1, 'Nome é obrigatório.'),
  phone: z.string().min(15, 'Celular inválido.').max(15, 'Celular inválido.'),
  password: z.string(),
  newPassword: z.string(),
});

export const useSettingsController = () => {
  const [editionMode, setEditionMode] = useState<boolean>(false);
  const { userId, logout } = useAuth();
  const { user, refetch } = useMe(userId);

  const toggleEditionMode = useCallback(
    () => setEditionMode(prev => !prev),
    [],
  );

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

  const setDefaultValues = () => {
    if (user) {
      setValue('image', user.image || '');
      setValue('name', user.name);
      setValue('phone', user.phone);
      setValue('password', '');
      setValue('newPassword', '');
    }

    refetch();
  };

  useEffect(() => {
    setDefaultValues();
  }, [user]);

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      if (data.name !== user!.name)
        await userService.updateName(userId, data.name);
      if (data.phone !== user!.phone)
        await userService.updatePhone(userId, data.phone);

      if (data.password && data.newPassword) {
        await userService.updatePassword({
          email: user!.email,
          password: data.newPassword,
          oldPassword: data.password,
        });
      }

      setDefaultValues();
      toggleEditionMode();

      Toast.show({
        type: 'success',
        text1: 'Perfil atualizado',
        swipeable: true,
        visibilityTime: 1800,
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Erro ao atualizar perfil',
        swipeable: true,
        visibilityTime: 1800,
      });
    }
  };

  const handleOpenImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets?.length) {
        const file = {
          uri: response.assets[0].uri!,
          type: response.assets[0].type!,
          name: response.assets[0].fileName!,
        };

        handleUploadImage(file);
      }
    });
  };

  const handleUploadImage = async (asset: FileType) => {
    try {
      const uploadData = new FormData();
      uploadData.append('file', asset);
      uploadData.append('upload_preset', env.UPLOAD_PRESET);
      uploadData.append('cloud_name', env.CLOUD_NAME);

      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${env.CLOUD_NAME}/upload`,
        uploadData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );

      await userService.updateImage(userId, data.secure_url);
      setDefaultValues();
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Erro ao carregar imagem',
        swipeable: true,
        visibilityTime: 1800,
      });
    }
  };

  return {
    user,
    editionMode,
    control,
    errors,
    setValue,
    toggleEditionMode,
    logout,
    handleOpenImagePicker,
    setDefaultValues,
    handleSubmit,
    onSubmit,
  };
};
