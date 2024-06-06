import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useChangePasswordController } from './useChangePasswordController';
import { Controller } from 'react-hook-form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { RouteProp, useRoute } from '@react-navigation/native';

interface ChangePasswordScreenProps {}

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = () => {
  const route =
    useRoute<
      RouteProp<{ ChangePassword: { email: string } }, 'ChangePassword'>
    >();
  const { goBack, control, errors, handleSubmit, onSubmit, setValue } =
    useChangePasswordController(route.params.email);

  return (
    <SafeAreaView className="flex-1 items-center">
      <View className="items-center justify-center pt-5 mb-20">
        <Image
          source={require('../../assets/filled-logo.png')}
          className="h-16"
          resizeMode="contain"
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="w-full p-4"
        style={{ gap: 20 }}
      >
        <Text className="text-3xl font-bold text-gray-700 text-center">
          Código de Recuperação
        </Text>
        <Controller
          control={control}
          name="token"
          render={({ field }) => (
            <Input
              placeholder="Código"
              autoCapitalize="none"
              value={field.value}
              onChangeText={value => setValue('token', value)}
              error={errors.token?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              placeholder="Nova Senha"
              secureTextEntry
              value={field.value}
              onChangeText={value => setValue('password', value)}
              error={errors.password?.message}
            />
          )}
        />
        <View className="w-full" style={{ gap: 14 }}>
          <Button variant="primary" onPress={handleSubmit(onSubmit)}>
            Enviar
          </Button>
          <View className="flex items-center">
            <TouchableOpacity onPress={() => goBack()}>
              <Text className="text-black/50">Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
