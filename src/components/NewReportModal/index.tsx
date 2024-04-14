import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Select from '../Select';
import TextBox from '../TextBox';
import Button from '../Button';
import Header from '../Header';
import { useNewReportModalController } from './useNewReportModalController';

interface NewReportModalProps {
  visible: boolean;
  onClose: () => void;
}

const NewReportModal: React.FC<NewReportModalProps> = ({
  visible,
  onClose,
}) => {
  const { options, images, handleTakePhoto } = useNewReportModalController();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1">
        <Header size="small" />

        <View className="p-3 pr-0">
          <FlatList
            data={images}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 10 }}
            ListHeaderComponent={() => (
              <TouchableOpacity onPress={handleTakePhoto}>
                <View
                  className="h-32 w-44 rounded-xl bg-gray-200 items-center justify-center"
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
                className="h-32 w-44 rounded-xl"
                resizeMode="cover"
              />
            )}
          />
        </View>

        <View className="p-3.5 gap-3.5">
          <View>
            <Text className="text-black font-bold text-lg">Denúncia:</Text>
            <Select options={options} value={options[0].value} />
          </View>

          <View>
            <Text className="text-black font-bold text-lg">Descrição:</Text>
            <TextBox numberOfLines={6} multiline />
          </View>

          <View>
            <Text className="text-black font-bold text-lg">Localização:</Text>
            <TextBox />
          </View>

          <View className="flex-row mt-3.5 space-x-3">
            <View className="flex-1">
              <Button variant="secondary" onPress={onClose}>
                <Text>Cancelar</Text>
              </Button>
            </View>
            <View className="flex-1">
              <Button variant="primary">
                <Text>Salvar</Text>
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default NewReportModal;
