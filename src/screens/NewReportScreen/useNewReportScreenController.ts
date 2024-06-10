import { zodResolver } from '@hookform/resolvers/zod';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { reportsService } from '../../services/reportsService';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { FileType } from '../../entities/types/File';
import { env } from '../../constants/env';
import Toast from 'react-native-toast-message';

type FormData = z.infer<typeof schema>;

const schema = z.object({
  type: z.enum(['ABANDONO', 'AGRESSAO', 'NEGLIGENCIA', 'EXPLORACAO', 'OUTROS']),
  description: z.string().min(1, 'Descrição é obrigatória.'),
  location: z.string().min(1, 'Localização é obrigatória.'),
  status: z.enum(['EM_ABERTO', 'EM_ANDAMENTO', 'ATENDIDO']),
  userId: z.string().min(1),
  images: z.array(z.string()),
});

export const useNewReportScreenController = (goBack: () => void) => {
  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false);
  const [imagesLocal, setImagesLocal] = useState<string[]>([]);
  const [imagesPath, setImagesPath] = useState<string[]>([]);
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'ABANDONO',
      description: '',
      location: '',
      status: 'EM_ABERTO',
      images: [],
      userId,
    },
  });

  const handleTakePicture = async () => {
    const photo = await camera.current?.takePhoto();
    if (photo) {
      CameraRoll.saveAsset(`file://${photo.path}`, {
        type: 'photo',
      });

      const file = {
        uri: `file://${photo.path}`,
        type: `image/${photo.path.split('.')[2]}`,
        name: `image.${photo.path.split('/cache/')[1]}`,
      };

      await handleUploadImage(file);
      setImagesLocal(prevImagesLocal => [...prevImagesLocal, file.uri]);
      setIsCameraVisible(false);
    }
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

      setImagesPath(prevImagesPath => [...prevImagesPath, data.secure_url]);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Erro ao carregar imagem',
        swipeable: true,
        visibilityTime: 1800,
      });
    }
  };

  const onSubmit: SubmitHandler<FormData> = async data => {
    if (imagesPath.length > 0) {
      await reportsService.create({
        ...data,
        images: imagesPath,
      });

      queryClient.invalidateQueries({ queryKey: ['reports'] });
      goBack();

      Toast.show({
        type: 'success',
        text1: 'Denúncia cadastrada com sucesso',
        swipeable: true,
        visibilityTime: 1800,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Imagens são obrigatórias',
        swipeable: true,
        visibilityTime: 1800,
      });
    }
  };

  const handleDeleteImage = (index: number) => {
    setImagesLocal(prevImagesLocal =>
      prevImagesLocal.filter((_, i) => i !== index),
    );
    setImagesPath(prevImagesPath =>
      prevImagesPath.filter((_, i) => i !== index),
    );
  };

  return {
    imagesLocal,
    imagesPath,
    isCameraVisible,
    camera,
    device,
    errors,
    control,
    setValue,
    setIsCameraVisible,
    handleTakePicture,
    handleDeleteImage,
    handleSubmit,
    onSubmit,
  };
};
