import { ActivityIndicator, Image, Modal, Pressable } from 'react-native';
import { useCameraScreenController } from './useCameraScreenController';
import { Camera, CameraDevice } from 'react-native-vision-camera';

interface CameraScreenProps {
  visible: boolean;
  device: CameraDevice | undefined;
  camera: React.RefObject<Camera>;
  onTakePicture: () => void;
  onClose: () => void;
}

const CameraScreen: React.FC<CameraScreenProps> = ({
  visible,
  device,
  camera,
  onTakePicture,
  onClose,
}) => {
  const { hasPermission } = useCameraScreenController();

  if (!hasPermission) return <ActivityIndicator />;

  if (!device) return null;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <Camera
        ref={camera}
        device={device}
        isActive={visible}
        style={{ flex: 1 }}
        photo
      />

      <Pressable
        onPress={onTakePicture}
        className="absolute bottom-7 w-14 h-14 rounded-full self-center bg-white"
      />
    </Modal>
  );
};

export default CameraScreen;
