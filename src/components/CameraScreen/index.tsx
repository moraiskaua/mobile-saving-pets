import { View, ActivityIndicator, Modal } from 'react-native';
import { useCameraScreenController } from './useCameraScreenController';
import { Camera } from 'react-native-vision-camera';

interface CameraScreenProps {
  visible: boolean;
  onClose: () => void;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ visible, onClose }) => {
  const { hasPermission, device } = useCameraScreenController();

  if (!hasPermission) return <ActivityIndicator />;

  if (!device) return null;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <Camera device={device} isActive={true} style={{ flex: 1 }} />
    </Modal>
  );
};

export default CameraScreen;
