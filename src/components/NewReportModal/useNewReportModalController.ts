import { useState } from 'react';

export const useNewReportModalController = () => {
  const [images, setImages] = useState<string[]>([]);

  const options = [
    { value: 'ABANDONO', label: 'Abandono' },
    { value: 'AGRESSAO', label: 'Agressão' },
    { value: 'NEGLIGENCIA', label: 'Negligência' },
    { value: 'EXPLORACAO', label: 'Exploração' },
    { value: 'OUTROS', label: 'Outros' },
  ];

  const handleTakePhoto = () => {};

  return { options, images, handleTakePhoto };
};
