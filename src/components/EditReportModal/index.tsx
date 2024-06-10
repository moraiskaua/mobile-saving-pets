import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
import { TypeOfStatus } from '../../entities/types/TypeOfStatus';
import FastImage from 'react-native-fast-image';
import CameraScreen from '../CameraScreen';

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
  const {
    reportTypeOptions,
    statusOptions,
    control,
    errors,
    isCameraVisible,
    device,
    camera,
    imagesLocal,
    handleTakePicture,
    setValue,
    handleSubmit,
    onSubmit,
    setIsCameraVisible,
  } = useEditReportModalController(report, onClose);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1">
        <Header size="small" />

        <CameraScreen
          visible={isCameraVisible}
          device={device}
          camera={camera}
          onTakePicture={handleTakePicture}
          onClose={() => setIsCameraVisible(false)}
        />

        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="p-3 pr-0"
          >
            <FlatList
              data={imagesLocal}
              horizontal
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={{ gap: 10 }}
              renderItem={({ item }) => (
                <Controller
                  name="images"
                  control={control}
                  defaultValue={report.images}
                  render={({ field }) => (
                    <FastImage
                      source={{
                        uri: item,
                      }}
                      className="h-32 w-44 rounded-xl"
                      resizeMode="cover"
                    />
                  )}
                />
              )}
            />
          </KeyboardAvoidingView>

          <View className="p-3.5 gap-3">
            <View>
              <Text className="text-black font-bold text-lg">Status:</Text>
              <Controller
                name="status"
                control={control}
                defaultValue={report.status}
                render={({ field }) => (
                  <Select
                    options={statusOptions}
                    value={field.value}
                    onChange={value =>
                      setValue('status', value as TypeOfStatus)
                    }
                    error={errors.type?.message}
                  />
                )}
              />
            </View>

            <View>
              <Text className="text-black font-bold text-lg">Denúncia:</Text>
              <Controller
                name="type"
                control={control}
                defaultValue={report.type}
                render={({ field }) => (
                  <Select
                    options={reportTypeOptions}
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
                defaultValue={report.description}
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
                defaultValue={report.location}
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
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default EditReportModal;
