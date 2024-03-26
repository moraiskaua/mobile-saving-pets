import { View, Text, SafeAreaView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = ({}) => {
  return (
    <SafeAreaView>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        colors={['#70529D', '#BE4CD0']}
        className=""
      >
        <View className="h-40 justify-center items-center">
          <Image source={require('../../assets/logo.png')} />
        </View>
      </LinearGradient>

      <View className="h-full items-center pt-20">
        <Text className="text-3xl font-bold">Fazer Login</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
