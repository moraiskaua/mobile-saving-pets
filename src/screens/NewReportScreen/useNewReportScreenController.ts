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
      uploadData.append('upload_preset', 'pr0qgvxd');
      uploadData.append('cloud_name', 'dw5mfh7lg');

      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/dw5mfh7lg/upload',
        uploadData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setImagesPath(prevImagesPath => [...prevImagesPath, data.secure_url]);
    } catch {}
  };

  const onSubmit: SubmitHandler<FormData> = async data => {
    await reportsService.create({
      ...data,
      images: imagesPath,
    });
    queryClient.invalidateQueries({ queryKey: ['reports'] });
    goBack();
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
    handleSubmit,
    onSubmit,
  };
};
