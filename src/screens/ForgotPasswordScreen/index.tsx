import { Image, SafeAreaView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Button from '../../components/Button';
import { useForgotPasswordController } from './useForgotPasswordController';
import { Controller } from 'react-hook-form';
import Input from '../../components/Input';

interface ForgotPasswordScreenProps {}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({}) => {
  const { goBack, control, errors, setValue, handleSubmit, onSubmit } =
    useForgotPasswordController();

  return (
    <SafeAreaView className="flex-1 items-center">
      <View className="items-center justify-center pt-5 mb-20">
        <Image
          source={require('../../assets/filled-logo.png')}
          className="h-16"
          resizeMode="contain"
        />
      </View>
      <View className="w-full p-4" style={{ gap: 20 }}>
        <Text className="text-3xl font-bold text-gray-700 text-center">
          Esqueci a senha
        </Text>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              placeholder="Email"
              autoCapitalize="none"
              value={field.value}
              onChangeText={value => setValue('email', value)}
              error={errors.email?.message}
            />
          )}
        />
        <View className="w-full" style={{ gap: 14 }}>
          <Button variant="primary" onPress={handleSubmit(onSubmit)}>
            Enviar código
          </Button>
          <View className="flex items-center">
            <TouchableOpacity onPress={() => goBack()}>
              <Text className="text-black/50">Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
