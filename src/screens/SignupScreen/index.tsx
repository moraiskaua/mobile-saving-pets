import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SignupScreenProps {}

const SignupScreen: React.FC<SignupScreenProps> = ({}) => {
  const { goBack } = useNavigation();

  return (
    <SafeAreaView>
      <Text>Signin Screen</Text>

      <Text>
        Já possui uma conta?
        <TouchableOpacity onPress={() => goBack()}>
          <Text>Entrar</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  );
};

export default SignupScreen;
