import { useEffect } from 'react';
import { useCameraPermission } from 'react-native-vision-camera';

export const useCameraScreenController = () => {
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission]);

  return { hasPermission };
};
