import { useNavigation } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { formatCPF, formatPhone } from '../../utils/formaters';
import { useSignupController } from './useSignupController';
import { Controller } from 'react-hook-form';

interface SignupScreenProps {}

const SignupScreen: React.FC<SignupScreenProps> = ({}) => {
  const { goBack, control, errors, handleSubmit, onSubmit, setValue } =
    useSignupController();

  return (
    <SafeAreaView>
      <View className="items-center justify-center pt-5">
        <Image
          source={require('../../assets/filled-logo.png')}
          className="h-16"
          resizeMode="contain"
        />
      </View>

      <View className="h-full items-center">
        <View className="w-full p-7" style={{ gap: 14 }}>
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
            name="cpf"
            render={({ field }) => (
              <Input
                placeholder="Cpf"
                autoCapitalize="none"
                value={field.value}
                keyboardType="numeric"
                onChangeText={value => setValue('cpf', formatCPF(value))}
                maxLength={14}
                error={errors.cpf?.message}
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
                keyboardType="phone-pad"
                value={field.value}
                onChangeText={value => setValue('phone', formatPhone(value))}
                maxLength={15}
                error={errors.phone?.message}
              />
            )}
          />

          <Button variant="primary" onPress={handleSubmit(onSubmit)}>
            Registrar
          </Button>

          <View className="flex-row justify-center items-center">
            <Text className="text-black/50">Já possui uma conta? </Text>
            <TouchableOpacity onPress={() => goBack()}>
              <Text className="text-black/80">Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
