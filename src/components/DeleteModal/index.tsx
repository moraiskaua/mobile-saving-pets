import { Text, Modal, View } from 'react-native';
import Button from '../Button';
import { useDeleteModalController } from './useDeleteModalController';
import { Report } from '../../entities/Report';

interface DeleteModalProps {
  visible: boolean;
  report: Report;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  report,
  onClose,
}) => {
  const { handleDeleteReport } = useDeleteModalController(report, onClose);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      transparent
    >
      <View className="flex-1 justify-center items-center bg-black/30">
        <View className="bg-white p-5 rounded-xl items-center">
          <Text className="font-bold text-black">
            Tem certeza que deseja deletar a denúncia?
          </Text>
          <View className="flex-row mt-3.5 space-x-3">
            <View className="w-32">
              <Button variant="secondary" onPress={onClose}>
                <Text>Não</Text>
              </Button>
            </View>
            <View className="w-32">
              <Button variant="primary" onPress={handleDeleteReport}>
                <Text>Sim</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
