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
import { useNavigation } from '@react-navigation/native';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = ({}) => {
  const { navigate } = useNavigation<any>();

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
        <Text className="text-3xl font-bold">Fazer Login</Text>

        <View className="w-full p-4" style={{ gap: 20 }}>
          <Input placeholder="Email" />
          <Input placeholder="Senha" secureTextEntry />

          <Button variant="primary">Entrar</Button>
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
