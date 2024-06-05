import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Select from '../../components/Select';
import TextBox from '../../components/TextBox';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { useNewReportScreenController } from './useNewReportScreenController';
import CameraScreen from '../../components/CameraScreen';
import FastImage from 'react-native-fast-image';
import { Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { TypeOfAbuse } from '../../entities/types/TypeOfAbuse';
import { reportTypeOptions } from '../../entities/consts/reportTypeOptions';

interface NewReportScreenProps {}

const NewReportScreen: React.FC<NewReportScreenProps> = ({}) => {
  const { goBack } = useNavigation();
  const {
    isCameraVisible,
    imagesLocal,
    imagesPath,
    device,
    camera,
    control,
    errors,
    setValue,
    setIsCameraVisible,
    handleTakePicture,
    handleSubmit,
    onSubmit,
  } = useNewReportScreenController(goBack);

  return (
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
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 10 }}
            ListHeaderComponent={() => (
              <TouchableOpacity onPress={() => setIsCameraVisible(true)}>
                <View className="h-32 w-44 rounded-xl border-2 border-black/50 bg-gray-200 items-center justify-center">
                  <Icon name="upload-cloud" size={32} />
                </View>
              </TouchableOpacity>
            )}
            renderItem={({ item }) => (
              <Controller
                name="images"
                control={control}
                defaultValue={imagesPath}
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
            <Text className="text-black font-bold text-lg">Denúncia:</Text>
            <Controller
              control={control}
              name="type"
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
              control={control}
              name="description"
              render={({ field }) => (
                <TextBox
                  value={field.value}
                  onChangeText={value => setValue('description', value)}
                  numberOfLines={6}
                  multiline
                  error={errors.description?.message}
                  isRow
                />
              )}
            />
          </View>

          <View>
            <Text className="text-black font-bold text-lg">Localização:</Text>
            <Controller
              control={control}
              name="location"
              render={({ field }) => (
                <TextBox
                  value={field.value}
                  onChangeText={value => setValue('location', value)}
                  error={errors.location?.message}
                  isRow
                />
              )}
            />
          </View>

          <View className="flex-row mt-3.5 space-x-3">
            <View className="flex-1">
              <Button variant="secondary" onPress={goBack}>
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
  );
};

export default NewReportScreen;
