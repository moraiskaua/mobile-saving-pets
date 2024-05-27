import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import { useMe } from '../../helpers/useMe';
import { userService } from '../../services/userService';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { FileType } from '../../entities/types/File';
import { env } from '../../constants/env';

type FormData = z.infer<typeof schema>;

const schema = z.object({
  image: z.string(),
  name: z.string().min(1, 'Nome é obrigatório.'),
  phone: z.string().min(15, 'Celular inválido.').max(15, 'Celular inválido.'),
  password: z.string(),
  newPassword: z.string(),
});

export const useSettingsController = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editionMode, setEditionMode] = useState<boolean>(false);
  const { userId, logout, updatePassword } = useAuth();
  const { user, refetch } = useMe(userId);

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

  useEffect(() => {
    setDefaultValues();
  }, [user]);

  const onSubmit: SubmitHandler<FormData> = async data => {
    if (data.name !== user!.name)
      await userService.updateName(userId, data.name);
    if (data.phone !== user!.phone)
      await userService.updatePhone(userId, data.phone);

    if (data.password && data.newPassword) {
      updatePassword({
        password: data.newPassword,
        oldPassword: data.password,
      });
    }

    setDefaultValues();
    toggleEditionMode();
  };

  const handleOpenImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.didCancel) {
          console.log('Operação cancelada');
        }

        console.log(response.assets?.[0].uri);
      },
    );
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
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
    } catch {}
  };

  const setDefaultValues = () => {
    refetch();

    if (user) {
      setValue('image', user.image || '');
      setValue('name', user.name);
      setValue('phone', user.phone);
      setValue('password', '');
      setValue('newPassword', '');
    }
  };

  return {
    user,
    editionMode,
    control,
    errors,
    setValue,
    logout,
    toggleEditionMode,
    handleOpenImagePicker,
    setDefaultValues,
    handleSubmit,
    onSubmit,
  };
};
