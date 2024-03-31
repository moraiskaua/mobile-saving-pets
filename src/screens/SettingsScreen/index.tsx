import { View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { Controller } from 'react-hook-form';
import Input from '../../components/Input';
import { useSettingsController } from './useSettingsController';
import { formatPhone } from '../../utils/formaters';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface SettingsScreenProps {}

const SettingsScreen: React.FC<SettingsScreenProps> = ({}) => {
  const { control, errors, handleSubmit, setValue, logout } =
    useSettingsController();

  return (
    <SafeAreaView>
      <Header />
      <View className="p-3">
        <View className="h-full p-2 rounded-xl bg-white relative">
          <TouchableOpacity
            className="absolute right-1.5 top-1.5"
            onPress={logout}
          >
            <Icon name="log-out-outline" size={36} color="red" />
          </TouchableOpacity>

          <View className="items-center" style={{ gap: 16 }}>
            <Image
              source={require('../../assets/person.png')}
              resizeMode="contain"
              className="h-32"
            />

            <View className="w-full" style={{ gap: 8 }}>
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
                    onChangeText={value =>
                      setValue('phone', formatPhone(value))
                    }
                    maxLength={15}
                    error={errors.phone?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input
                    placeholder="Senha"
                    autoCapitalize="none"
                    secureTextEntry
                    value={field.value}
                    onChangeText={value => setValue('password', value)}
                    error={errors.password?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="newPassword"
                render={({ field }) => (
                  <Input
                    placeholder="Nova Senha"
                    autoCapitalize="none"
                    secureTextEntry
                    value={field.value}
                    onChangeText={value => setValue('newPassword', value)}
                    error={errors.password?.message}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
