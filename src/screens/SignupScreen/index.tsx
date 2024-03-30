import { useNavigation } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { formatPhone } from '../../utils/formaters';

interface SignupScreenProps {}

const SignupScreen: React.FC<SignupScreenProps> = ({}) => {
  const { goBack } = useNavigation();

  return (
    <SafeAreaView>
      <View className="items-center justify-center pt-5">
        <Image source={require('../../assets/filled-logo.png')} />
      </View>

      <View className="h-full items-center">
        <View className="w-full p-8" style={{ gap: 16 }}>
          <Input placeholder="Nome" />
          <Input placeholder="Email" />
          <Input placeholder="Senha" secureTextEntry />
          <Input placeholder="Cpf" />
          <Input placeholder="Celular" />

          <Button variant="primary">Registrar</Button>
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
