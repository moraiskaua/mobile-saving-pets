import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
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

interface NewReportScreenProps {}

const NewReportScreen: React.FC<NewReportScreenProps> = ({}) => {
  const {
    isCameraVisible,
    options,
    images,
    device,
    control,
    errors,
    camera,
    setValue,
    setIsCameraVisible,
    handleTakePicture,
    handleSubmit,
    onSubmit,
  } = useNewReportScreenController();
  const { goBack } = useNavigation();

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

      <View className="p-3 pr-0">
        <FlatList
          data={images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ gap: 10 }}
          ListHeaderComponent={() => (
            <TouchableOpacity onPress={() => setIsCameraVisible(true)}>
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
            <FastImage
              source={{
                uri: item,
              }}
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
            control={control}
            name="type"
            render={({ field }) => (
              <Select
                options={options}
                value={field.value}
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
    </SafeAreaView>
  );
};

export default NewReportScreen;
