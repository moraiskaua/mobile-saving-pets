import { View, Text, Modal, FlatList, TouchableOpacity } from 'react-native';
import { Report } from '../../entities/Report';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Select from '../Select';
import { useEditModalController } from './useEditModalController';

interface EditModalProps {
  visible: boolean;
  report: Report;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ visible, report, onClose }) => {
  const { options } = useEditModalController();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1">
        <View className="p-3">
          <FlatList
            data={report.images}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 10 }}
            ListHeaderComponent={() => (
              <TouchableOpacity>
                <View
                  className="h-40 w-52 rounded-xl bg-gray-200 items-center justify-center"
                  style={{
                    borderWidth: 2,
                    borderColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <Icon name="upload-cloud" size={32} />
                </View>
              </TouchableOpacity>
            )}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                className="h-40 w-52 rounded-xl"
                resizeMode="cover"
              />
            )}
          />
        </View>

        <View className="p-3">
          <Text className="text-black font-bold text-lg">Denúncia:</Text>
          <Select options={options} value={report.type} />
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;
