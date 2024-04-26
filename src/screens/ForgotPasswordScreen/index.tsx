import { Image, SafeAreaView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Button from '../../components/Button';
import { useForgotPasswordController } from './useForgotPasswordController';

interface ForgotPasswordScreenProps {}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({}) => {
  const { goBack } = useForgotPasswordController();
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
          <Button variant="primary">Enviar código</Button>
          <View className="flex-row justify-center items-center">
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
