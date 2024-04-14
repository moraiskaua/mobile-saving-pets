import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export const useNewReportModalController = () => {
  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const { navigate } = useNavigation<any>();

  const options = [
    { value: 'ABANDONO', label: 'Abandono' },
    { value: 'AGRESSAO', label: 'Agressão' },
    { value: 'NEGLIGENCIA', label: 'Negligência' },
    { value: 'EXPLORACAO', label: 'Exploração' },
    { value: 'OUTROS', label: 'Outros' },
  ];

  const handleTakePhoto = () => {
    // navigate('Camera');
  };

  return {
    options,
    images,
    isCameraVisible,
    setIsCameraVisible,
    handleTakePhoto,
  };
};
