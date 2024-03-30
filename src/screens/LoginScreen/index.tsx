import { View, Text, SafeAreaView, Image, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = ({}) => {
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

        <View className="w-full p-3.5" style={{ gap: 20 }}>
          <Input placeholder="Email" />
          <Input placeholder="Senha" secureTextEntry />

          <Button variant="primary">Entrar</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
