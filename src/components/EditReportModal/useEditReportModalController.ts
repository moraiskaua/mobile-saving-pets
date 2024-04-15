import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Report } from '../../entities/Report';
import { reportsService } from '../../services/reportsService';
import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import axios from 'axios';
import { FileType } from '../../entities/types/File';
import { reportTypeOptions } from '../../entities/consts/reportTypeOptions';
import { statusOptions } from '../../entities/consts/statusOptions';

type FormData = z.infer<typeof schema>;

const schema = z.object({
  type: z.enum(['ABANDONO', 'AGRESSAO', 'NEGLIGENCIA', 'EXPLORACAO', 'OUTROS']),
  description: z.string().min(1, 'Descrição é obrigatória.'),
  location: z.string().min(1, 'Localização é obrigatória.'),
  status: z.enum(['EM_ABERTO', 'EM_ANDAMENTO', 'ATENDIDO']),
  userId: z.string().min(1),
  images: z.array(z.string()),
});

export const useEditReportModalController = (
  report: Report,
  onClose: () => void,
) => {
  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false);
  const [imagesLocal, setImagesLocal] = useState<string[]>(report.images);
  const [imagesPath, setImagesPath] = useState<string[]>([]);
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const queryClient = useQueryClient();

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

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { ...report },
  });

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      await reportsService.update(report.id, data);
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    reportTypeOptions,
    statusOptions,
    errors,
    control,
    isCameraVisible,
    imagesLocal,
    imagesPath,
    device,
    camera,
    handleTakePicture,
    setIsCameraVisible,
    setImagesLocal,
    setImagesPath,
    setValue,
    handleSubmit,
    onSubmit,
  };
};
