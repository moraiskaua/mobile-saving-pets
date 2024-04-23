import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useLoginController } from './useLoginController';
import { Controller } from 'react-hook-form';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = ({}) => {
  const { navigate, control, errors, handleSubmit, setValue, onSubmit } =
    useLoginController();

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../../assets/banner-bg.png')}
        className="h-52 justify-center items-center"
        resizeMode="contain"
      >
        <Image source={require('../../assets/logo.png')} />
      </ImageBackground>

      <View className="h-full items-center pt-7">
        <Text className="text-3xl font-bold text-gray-700">Fazer Login</Text>

        <View className="w-full p-4" style={{ gap: 20 }}>
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
                secureTextEntry
                value={field.value}
                onChangeText={value => setValue('password', value)}
                error={errors.password?.message}
              />
            )}
          />
          <TouchableOpacity onPress={() => navigate('ForgotPassword')} className=''>
            <Text className="text-black/30">Esqueci a senha</Text>
          </TouchableOpacity>

          <Button variant="primary" onPress={handleSubmit(onSubmit)}>
            Entrar
          </Button>

          <View className="flex-row justify-center items-center">
            <Text className="text-black/50">Não tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigate('Signup')}>
              <Text className="text-black/80">Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
