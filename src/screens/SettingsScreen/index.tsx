import { Controller } from 'react-hook-form';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { formatPhone } from '../../utils/formaters';
import { useSettingsController } from './useSettingsController';

interface SettingsScreenProps {}

const SettingsScreen: React.FC<SettingsScreenProps> = ({}) => {
  const {
    user,
    editionMode,
    control,
    errors,
    setValue,
    toggleEditionMode,
    logout,
    handleOpenImagePicker,
    setDefaultValues,
    handleSubmit,
    onSubmit,
  } = useSettingsController();

  return (
    <SafeAreaView className="flex-1">
      <Header />

      <View className="flex-1 p-3">
        <View className="p-2.5 rounded-xl bg-white relative">
          <TouchableOpacity
            className="absolute right-1.5 top-1.5"
            onPress={logout}
          >
            <Icon name="log-out-outline" size={36} color="red" />
          </TouchableOpacity>

          <View className="items-center" style={{ gap: 16 }}>
            {editionMode ? (
              <TouchableOpacity onPress={handleOpenImagePicker}>
                <FastImage
                  source={
                    user?.image
                      ? { uri: user.image }
                      : require('../../assets/person.png')
                  }
                  resizeMode="cover"
                  className="h-32 w-32 rounded-full"
                />
                <Text className="text-center text-xs -mt-0.5">Trocar foto</Text>
              </TouchableOpacity>
            ) : (
              <FastImage
                source={
                  user?.image
                    ? { uri: user.image }
                    : require('../../assets/person.png')
                }
                resizeMode="cover"
                className="h-32 w-32 rounded-full"
              />
            )}

            <View className="w-full" style={{ gap: 10 }}>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    placeholder="Nome"
                    autoCapitalize="words"
                    value={field.value}
                    onChangeText={value => setValue('name', value)}
                    error={errors.name?.message}
                    editable={editionMode}
                  />
                )}
              />
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <Input
                    placeholder="Celular"
                    autoCapitalize="none"
                    value={field.value}
                    keyboardType="phone-pad"
                    onChangeText={value =>
                      setValue('phone', formatPhone(value))
                    }
                    maxLength={15}
                    error={errors.phone?.message}
                    editable={editionMode}
                  />
                )}
              />

              <View className="flex-row space-x-2.5">
                <View className="flex-1">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <Input
                        placeholder="Senha atual"
                        autoCapitalize="none"
                        secureTextEntry
                        isRow
                        value={field.value}
                        onChangeText={value => setValue('password', value)}
                        error={errors.password?.message}
                        editable={editionMode}
                      />
                    )}
                  />
                </View>
                <View className="flex-1">
                  <Controller
                    control={control}
                    name="newPassword"
                    render={({ field }) => (
                      <Input
                        placeholder="Nova Senha"
                        autoCapitalize="none"
                        secureTextEntry
                        isRow
                        value={field.value}
                        onChangeText={value => setValue('newPassword', value)}
                        error={errors.password?.message}
                        editable={editionMode}
                      />
                    )}
                  />
                </View>
              </View>

              <View className="flex-row mt-3 space-x-3">
                {editionMode ? (
                  <>
                    <View className="flex-1">
                      <Button
                        variant="secondary"
                        onPress={() => {
                          toggleEditionMode();
                          setDefaultValues();
                        }}
                      >
                        <Text>Cancelar</Text>
                      </Button>
                    </View>
                    <View className="flex-1">
                      <Button
                        variant="primary"
                        onPress={handleSubmit(onSubmit)}
                      >
                        <Text>Salvar</Text>
                      </Button>
                    </View>
                  </>
                ) : (
                  <Button onPress={toggleEditionMode}>
                    <Text>Editar Perfil</Text>
                  </Button>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
