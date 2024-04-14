import { View, Text, ActivityIndicator } from 'react-native';
import { useCameraScreenController } from './useCameraScreenController';
import { Camera } from 'react-native-vision-camera';

interface CameraScreenProps {}

const CameraScreen: React.FC<CameraScreenProps> = ({}) => {
  const { hasPermission, device } = useCameraScreenController();

  if (!hasPermission) return <ActivityIndicator />;

  if (!device) return null;

  return (
    <View>
      <Camera device={device} isActive={true} />
    </View>
  );
};

export default CameraScreen;
