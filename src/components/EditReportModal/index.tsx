import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Select from '../Select';
import TextBox from '../TextBox';
import Button from '../Button';
import Header from '../Header';
import { useEditReportModalController } from './useEditReportModalController';
import { Controller } from 'react-hook-form';
import { Report } from '../../entities/Report';
import { TypeOfAbuse } from '../../entities/types/TypeOfAbuse';

interface EditReportModalProps {
  visible: boolean;
  report: Report;
  onClose: () => void;
}

const EditReportModal: React.FC<EditReportModalProps> = ({
  visible,
  report,
  onClose,
}) => {
  const { options, control, errors, setValue, handleSubmit, onSubmit } =
    useEditReportModalController(report);

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
            data={report?.images}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 10 }}
            ListHeaderComponent={() => (
              <TouchableOpacity>
                <View className="h-32 w-44 border-2 border-black/50 rounded-xl bg-gray-200 items-center justify-center">
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
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  options={options}
                  value={field.value}
                  onChange={value => setValue('type', value as TypeOfAbuse)}
                  error={errors.type?.message}
                />
              )}
            />
          </View>

          <View>
            <Text className="text-black font-bold text-lg">Descrição:</Text>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextBox
                  numberOfLines={6}
                  multiline
                  initialValue={report.description}
                  value={field.value}
                  onChangeText={value => setValue('description', value)}
                  error={errors.description?.message}
                />
              )}
            />
          </View>

          <View>
            <Text className="text-black font-bold text-lg">Localização:</Text>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextBox
                  initialValue={report.location}
                  value={field.value}
                  onChangeText={value => setValue('location', value)}
                  error={errors.location?.message}
                />
              )}
            />
          </View>

          <View className="flex-row mt-3.5 space-x-3">
            <View className="flex-1">
              <Button variant="secondary" onPress={onClose}>
                <Text>Cancelar</Text>
              </Button>
            </View>
            <View className="flex-1">
              <Button variant="primary" onPress={handleSubmit(onSubmit)}>
                <Text>Salvar</Text>
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default EditReportModal;
