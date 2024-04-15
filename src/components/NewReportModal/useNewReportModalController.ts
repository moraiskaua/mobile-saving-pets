import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useRef, useState } from 'react';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

export const useNewReportModalController = () => {
  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);

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
      CameraRoll.save(`file://${photo.path}`, {
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
    setIsCameraVisible,
    handleTakePicture,
  };
};
