import { zodResolver } from '@hookform/resolvers/zod';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { reportsService } from '../../services/reportsService';

type FormData = z.infer<typeof schema>;

const schema = z.object({
  type: z.enum(['ABANDONO', 'AGRESSAO', 'NEGLIGENCIA', 'EXPLORACAO', 'OUTROS']),
  description: z.string().min(1, 'Descrição é obrigatória.'),
  location: z.string().min(1, 'Localização é obrigatória.'),
  status: z.enum(['EM_ABERTO', 'EM_ANDAMENTO', 'ATENDIDO']),
  userId: z.string().min(1),
  images: z.array(z.string()),
});

export const useNewReportScreenController = () => {
  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const { userId } = useAuth();

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

  const onSubmit: SubmitHandler<FormData> = async data => {
    console.log(data);
    // reportsService.create(data);
  };

  const options = [
    { value: 'ABANDONO', label: 'Abandono' },
    { value: 'AGRESSAO', label: 'Agressão' },
    { value: 'NEGLIGENCIA', label: 'Negligência' },
    { value: 'EXPLORACAO', label: 'Exploração' },
    { value: 'OUTROS', label: 'Outros' },
  ];

  const handleTakePicture = async () => {
    const photo = await camera.current?.takePhoto();
    if (photo) {
      CameraRoll.saveAsset(`file://${photo.path}`, {
        type: 'photo',
      });
      setImages([...images, `file://${photo.path}`]);
      setIsCameraVisible(false);
    }
  };

  return {
    options,
    images,
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
