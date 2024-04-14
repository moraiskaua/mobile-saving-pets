import { useEffect } from 'react';
import {
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

export const useCameraScreenController = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission]);

  return { hasPermission, device };
};
